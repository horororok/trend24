import os

from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue, SearchParams


class QdrantSearcher:
    def __init__(self, collection_name="yes24_v2_collection", database_url="http://localhost:6663"):
        QDRANT_HOST = str(os.getenv("QDRANT_HOST"))
        QDRANT_PORT = str(os.getenv("PORT"))
        QDRANT_URL = f"http://{QDRANT_HOST}:{QDRANT_PORT}"
        # self.client = QdrantClient(path=database_url)
        self.client = QdrantClient(url=QDRANT_URL)
        self.collection_name = collection_name
        print('Embeddings loaded successfully.')

    def search_items(self, search_item, search_keywords, top_k=5,
                     must_not_conditions=[]):  # search_item is numpy(embedded vector)
        # query_vector = search_item.tolist()
        query_vector = search_item

        search_result = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=top_k,
            with_vectors=False,
            # query_filter = Filter(
            #     must_not=[
            #         FieldCondition(key="category", match=MatchValue(value=item)) for item in must_not_conditions
            #     ]
            # ),
        )

        results = []

        for result in search_result:
            item = {
                'searched_keywords': search_keywords
            }

            for key, value in result:
                if key == 'id':
                    item['book_id'] = int(value)
                elif key == 'score':
                    item[f'{key}'] = float(value)
                elif key == 'payload':
                    if isinstance(value, dict):  # value가 사전 타입인지 확인
                        for pl_key, pl_value in value.items():
                            item[f'{pl_key}'] = pl_value
                else:
                    pass

            results.append(item)

        return results

    # For Fast API
    def search_book_id(self, book_id):
        response = self.client.search(
            collection_name=self.collection_name,
            query_vector=[0.5] * 512,
            query_filter=Filter(
                must=[FieldCondition(key="book_id", match=MatchValue(value=book_id))]
            ),
            with_vectors=True,
            search_params=SearchParams(hnsw_ef=2000000),
            limit=1,
        )

        return response

    # For Fast API
    def search_meorial_books(self, my_book, top_k=5):
        search_result = self.client.search(
            collection_name=self.collection_name,
            query_vector=my_book.vector,
            limit=top_k,
        )

        reponse_book_id = []

        for result in search_result:
            if result.id is not my_book.id:
                reponse_book_id.append(result.id)

        return reponse_book_id

    # For Fast API
    def find_memorial_book(self, book_id, top_k=30):
        my_book = self.search_book_id(book_id)

        if len(my_book) is not 0:
            results = self.search_meorial_books(my_book[0], top_k + 1)

            return results
        return []

    def search_book_id_real_service(self, book_id, question_id):
        response = self.client.search(
            collection_name=self.collection_name,
            query_vector=[0.5] * 512,
            query_filter=Filter(
                must=[FieldCondition(key="book_id", match=MatchValue(value=book_id))]
            ),
            with_vectors=True,
            search_params=SearchParams(hnsw_ef=2000000),
            limit=1,
        )

        if response:
            vector_id = response[0].id
            payload = response[0].payload

            # memory_category가 존재하지 않거나, new_value가 없다면 추가
            if 'memory_category' not in payload:
                payload['memory_category'] = [question_id]
                update_required = True
            elif question_id not in payload['memory_category']:
                payload['memory_category'].append(question_id)
                update_required = True
            else:
                update_required = False

            # 필요한 경우 업데이트
            if update_required:
                self.client.set_payload(
                    collection_name=self.collection_name,
                    payload=payload,
                    points=[vector_id]
                )
                print(f"Updated memory_category for book_id {book_id} with value {question_id}")
            else:
                print(f"No update needed for book_id {book_id}, value {question_id} already present")

        else:
            print(f"No data found for book_id {book_id}")

        return response

    # For Fast API
    def search_meorial_books_real_service(self, my_book, question_id, top_k=5):
        search_result = self.client.search(
            collection_name=self.collection_name,
            query_vector=my_book.vector,
            limit=top_k,
            query_filter=Filter(
                must=[
                    FieldCondition(key="memory_category", match=MatchValue(value=question_id))
                ]
            ),
        )

        reponse_book_id = []

        for result in search_result[1:]:
            reponse_book_id.append(result.id)

        return reponse_book_id

    # For Fast API
    def find_memorial_book_real_service(self, book_id, question_id, top_k=30):
        my_book = self.search_book_id_real_service(book_id, question_id)

        if len(my_book) is not 0:
            results = self.search_meorial_books_real_service(my_book[0], question_id, top_k + 1)

            return results
        return []

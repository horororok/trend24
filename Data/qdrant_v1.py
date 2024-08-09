import json
from tqdm import tqdm

# JSON 파일 경로
file_path = "../S10P31S203/YES24-20231217-20231223-Search-Clickstream-TAG-Thema.json"

book_id = set([])
book_topic_data = []  # JSON 데이터를 저장할 리스트
book_code = {}

with open(file_path, "r", encoding="utf-8") as json_file:
    for line in tqdm(json_file, desc="Processing"):
        json_data = json.loads(line)  # 한 줄씩 JSON 형식으로 파싱

        if json_data['product_id'] in book_id:
            pass
        else:
            thema_list = []

            for thema in json_data['thema_codes']:
                thema_code = thema['CodeValue']
                thema_description = thema['CodeDescription']

                thema_list.append(thema_code)

                if thema_code in book_code:
                    if thema_description in book_code[thema_code]:
                        pass
                    else:
                        book_code[thema_code].append(thema_description)
                else:
                    book_code[thema_code] = [thema_description]

            book_topic_data.append({
                'topics': json_data['tags']['topics'],
                'book_id': json_data['product_id'],
                'book_name': json_data['product_name'],
                'category_id': json_data['category_id'],
                'category': json_data['category_name'],
                'thema_code': thema_list
            })

            book_id.add(json_data['product_id'])

    print(len(book_topic_data))
    print(len(book_id))
    print(len(book_code))


    import numpy as np

    loaded_embeddings_topic = np.load("test_develop_file/embeddings_topic.npy")


    # Colleciton 생성
    from qdrant_client import QdrantClient
    from qdrant_client.http import models
    from qdrant_client.models import VectorParams, Distance

    client = QdrantClient(path="/data/qdrant_db")

    my_collection = "yes24_test_collection"

    ch24_collection = client.recreate_collection(
        collection_name=my_collection,
        vectors_config=VectorParams(size=512, distance=Distance.COSINE)
    )


    from qdrant_client.models import PointStruct

    # Rerank 작업을 위해 Vector 부분 원본을 payload 에 추가해야할 필요?
    # models.Batch 로 저장하기 위해 article_no 를 int 타입으로 변경해야 함
    for idx, item in tqdm(enumerate(book_topic_data), desc="Processing"):
        client.upsert(
            collection_name=my_collection,
            points=[
                PointStruct(
                    id=int(item['book_id']),  # book_id
                    vector=loaded_embeddings_topic[idx],
                    payload={
                        "book_id": int(item['book_id']),
                        "book_name": item['book_name'],
                        "category_id": item['category_id'],
                        "category": item['category'],
                        "theme_code": item['thema_code'],
                        "topics": item['topics'],
                        "memory_category": [],
                    }
                )
            ]
        )
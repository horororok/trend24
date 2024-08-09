import json
from itertools import islice
from tqdm import tqdm
from qdrant_client.models import PointStruct
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
import numpy as np
from dotenv import load_dotenv
from pathlib import Path
import os
import traceback
import sys

dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)
QDRANT_HOST = str(os.getenv("QDRANT_HOST"))
PORT = str(os.getenv("PORT"))

print("작업 시작", flush=True)
try:
    # JSON 파일 경로
    file_path = "./books.json"  # 경로

    book_id = set([])
    book_topic_data = []  # JSON 데이터를 저장할 리스트
    book_code = {}

    line_number = 0
    with open(file_path, "r", encoding="utf-8") as json_file:
        for line in tqdm(json_file, desc="Processing"):
            line_number += 1
            if (line_number == 1 or line_number % 10000 == 0):
                print(f"작업중인 라인: {line_number}", flush=True)
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

        print(f"len(book_topic_data): {len(book_topic_data)}", flush=True)
        print(f"len(book_id): {len(book_id)}", flush=True)
        print(f"len(book_code): {len(book_code)}", flush=True)

        loaded_embeddings_topic = np.load("./embeddings_topic.npy")  # 경로

        # Colleciton 생성
        client = QdrantClient(url=f"http://{QDRANT_HOST}:{PORT}")

        my_collection = "yes24_v2_collection"

        ch24_collection = client.recreate_collection(
            collection_name=my_collection,
            vectors_config=VectorParams(size=512, distance=Distance.COSINE)
        )

        print("collection upsert 시작", flush=True)
        
        # book_topic_data를 batch_size만큼 나누어서 처리합니다.
        batch_size = 500
        batch_number = 0
        print(f"전체 사이즈: {len(book_topic_data)}", flush=True)
        for batch_data in (islice(book_topic_data, i, i + batch_size) for i in
                           range(0, len(book_topic_data), batch_size)):

            inserted_element_count = batch_number*batch_size
            print(f"진행중인 batch_numer: {batch_number} 작업된 양: {inserted_element_count}, 목표 작업량: {len(book_topic_data)}", flush=True)

            # 각 batch_data에 대해 upsert 작업을 수행합니다.
            client.upsert(
                collection_name=my_collection,
                points=[
                    PointStruct(
                        id=int(item['book_id']),  # book_id
                        vector=loaded_embeddings_topic[inserted_element_count+idx],
                        payload={
                            "book_id": int(item['book_id']),
                            "book_name": item['book_name'],
                            "category_id": item['category_id'],
                            "category": item['category'],
                            "theme_code": item['thema_code'],
                            "topics": item['topics']
                        }
                    ) for idx, item in enumerate(batch_data)
                ]
            )

            batch_number += 1

        print("검색 테스트", flush=True)
        query_vector = loaded_embeddings_topic[-1]  # 검색할 벡터
        search_results = client.search(my_collection, query_vector)
        print(search_results, flush=True)

except Exception as e:
    # 다른 모든 예외에 대한 처리
    print("에러 발생:", e, flush=True)
    traceback.print_exc(file=sys.stderr)
    sys.stderr.flush()

print("종료합니다.", flush=True)
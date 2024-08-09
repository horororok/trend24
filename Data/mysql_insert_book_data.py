import json
from tqdm import tqdm
from mysql_insert import Mysql_Manager

book_v1_path = "../book_yes24.json"
book_id_content = {}

with open(book_v1_path, "r", encoding="utf-8") as json_file:
    for line in tqdm(json_file, desc="Processing"):
        json_data = json.loads(line)

        if 'contents' in json_data:
            if json_data['product_id'] not in book_id_content:
                book_id_content[json_data['product_id']] = json_data['contents']

print(f'version1 book len : {len(book_id_content)}')


# JSON 파일 경로
file_path = "../S10P31S203/YES24-20231217-20231223-Search-Clickstream-TAG-Thema.json"

book_id = set([])
book_topic_data = []  # JSON 데이터를 저장할 리스트
book_code = {}

sql_manager = Mysql_Manager()
fixed_datetime = '2024-05-25 02:00:00'

with open(file_path, "r", encoding="utf-8") as json_file:
    for line in tqdm(json_file, desc="Processing"):
        json_data = json.loads(line)  # 한 줄씩 JSON 형식으로 파싱

        if json_data['product_id'] in book_id:
            pass
        else:
            if json_data['product_id'] in book_id_content:
                sql_manager.insert_book(json_data, book_id_content[json_data['product_id']], fixed_datetime)
            else:
                sql_manager.insert_book(json_data, "", fixed_datetime)


            '''book_topic_data.append({
                'topics': json_data['tags']['topics'],
                'book_id': json_data['product_id'],
                'book_name': json_data['product_name'],
                'category_id': json_data['category_id'],
                'category': json_data['category_name'],
                'thema_code': thema_list
            })'''

            book_id.add(json_data['product_id'])
import json
import os
from datetime import datetime

import pymysql
from dotenv import load_dotenv


class Mysql_Manager():
    def __init__(self):
        load_dotenv()
        self.DB_pw = os.getenv("MYSQL_PASSWORD")
        self.DB_port = int(os.getenv("HOST_PORT"))
        self.DB_name = os.getenv("MYSQL_DATABASE")
        self.DB_user = os.getenv("MYSQL_USER")
        self.DB_host = os.getenv("DB_HOST")

        # 데이터베이스 연결 설정
        self.connection = pymysql.connect(host=self.DB_host,  # 로컬 호스트 사용
                                          port=self.DB_port,
                                          user=self.DB_user,
                                          password=self.DB_pw,
                                          database=self.DB_name,
                                          charset='utf8mb4')

        self.category_table = 'trend_category'
        self.platform_table = 'platform'

        self.book_table = 'book'

        self.origin_table = 'origin_data'
        self.keyword_table = 'keyword'
        self.recommend_table = 'daily_recommend'

        self.recommend_keyword_table = 'recommend_keyword'
        self.keyword_platform_table = 'trend_source'

        print('Embeddings loaded successfully.')

    def insert_platform(self, platform_name):
        with self.connection.cursor() as cursor:
            upload_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            # INSERT SQL 쿼리 작성
            insert_sql = f"INSERT INTO {self.platform_table} (created_time, updated_time, name) VALUES (%s, %s, %s)"

            # SQL 쿼리 실행
            cursor.execute(insert_sql, (upload_datetime, upload_datetime, platform_name))

            # 변경 사항 커밋
            self.connection.commit()

    def insert_category(self, category_name):
        with self.connection.cursor() as cursor:
            upload_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            # INSERT SQL 쿼리 작성
            insert_sql = f"INSERT INTO {self.category_table} (created_time, updated_time, name) VALUES (%s, %s, %s)"

            # SQL 쿼리 실행
            cursor.execute(insert_sql, (upload_datetime, upload_datetime, category_name))

            # 변경 사항 커밋
            self.connection.commit()

    def insert_origin_data(self, origin_json, platform_name, category_name, upload_date):
        with self.connection.cursor() as cursor:
            # INSERT SQL 쿼리 작성
            insert_sql = f"INSERT INTO {self.origin_table} (created_time, updated_time, contents, category_id, platform_id) VALUES (%s, %s, %s, %s, %s)"

            select_sql = f"SELECT id FROM {self.category_table} WHERE name = %s"
            cursor.execute(select_sql, (category_name,))
            category_id = cursor.fetchone()[0]

            select_sql = f"SELECT id FROM {self.platform_table} WHERE name = %s"
            cursor.execute(select_sql, (platform_name,))
            platform_id = cursor.fetchone()[0]

            # SQL 쿼리 실행
            cursor.execute(insert_sql, (upload_date, upload_date, json.dumps(origin_json), category_id, platform_id))

            # 변경 사항 커밋
            self.connection.commit()

            return_id_sql = f"SELECT LAST_INSERT_ID()"
            cursor.execute(return_id_sql)

            return cursor.fetchone()[0]

    def insert_keyword(self, keyword, rank, category_name, upload_date):
        with self.connection.cursor() as cursor:
            insert_sql = f"INSERT INTO {self.keyword_table} (created_time, updated_time, name, ranking, category_id) VALUES (%s, %s, %s, %s, %s)"

            select_sql = f"SELECT id FROM {self.category_table} WHERE name = %s"
            cursor.execute(select_sql, (category_name,))
            category_id = cursor.fetchone()[0]

            # SQL 쿼리 실행
            cursor.execute(insert_sql, (upload_date, upload_date, keyword, rank, category_id))

            # 변경 사항 커밋
            self.connection.commit()

            return_id_sql = f"SELECT LAST_INSERT_ID()"
            cursor.execute(return_id_sql)

            return cursor.fetchone()[0]

    def insert_trend_source(self, keyword_id, origin_id, upload_date):
        with self.connection.cursor() as cursor:
            insert_sql = f"INSERT INTO {self.keyword_platform_table} (created_time, updated_time, keyword_id, origin_data_id) VALUES (%s, %s,%s, %s)"

            # SQL 쿼리 실행
            cursor.execute(insert_sql, (upload_date, upload_date, keyword_id, origin_id))

            # 변경 사항 커밋
            self.connection.commit()

    def insert_daily_recommend(self, book_id, upload_date):
        with self.connection.cursor() as cursor:
            insert_sql = f"INSERT INTO {self.recommend_table} (created_time, updated_time, book_id) VALUES (%s, %s, %s)"

            select_sql = f"SELECT id FROM {self.book_table} WHERE product_id = %s"
            cursor.execute(select_sql, (book_id,))
            book_pk = cursor.fetchone()[0]
            # SQL 쿼리 실행
            cursor.execute(insert_sql, (upload_date, upload_date, book_pk))

            # 변경 사항 커밋
            self.connection.commit()

            return_id_sql = f"SELECT LAST_INSERT_ID()"
            cursor.execute(return_id_sql)

            return cursor.fetchone()[0]

    def insert_recommend_keyword(self, daily_recommend_id, keyword_id, upload_date):
        with self.connection.cursor() as cursor:
            insert_sql = f"INSERT INTO {self.recommend_keyword_table} (created_time, updated_time, daily_recommend_id, keyword_id) VALUES (%s, %s,%s, %s)"

            # SQL 쿼리 실행
            cursor.execute(insert_sql, (upload_date, upload_date, daily_recommend_id, keyword_id))

            # 변경 사항 커밋
            self.connection.commit()

    def insert_book(self, book, contents, upload_date):
        with self.connection.cursor() as cursor:
            insert_sql = (f"INSERT INTO {self.book_table} (created_time, updated_time, category_id, category_name, "
                          f"contents, product_id, product_name, sale_price, search_keyword, total_click_count, "
                          f"total_order_amount, total_order_count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
                          f"%s, %s)")
            try:
                # SQL 쿼리 실행
                cursor.execute(insert_sql,
                               (upload_date, upload_date, book['category_id'],
                                book['category_name'], contents, book['product_id'],
                                book['product_name'], book['sale_price'], "",
                                book['total_click_count'], book['total_order_amount'], book['total_order_count']))
            except Exception as e:
                print(f"{book['product_id']} :: {e}")
            # 변경 사항 커밋
            self.connection.commit()

    def test_app(self):
        with self.connection.cursor() as cursor:
            fixed_datetime = '2024-05-02 02:00:00'
            insert_sql = f"INSERT INTO book (created_time, updated_time, product_id, category_id) VALUES (%s, %s,%s, %s)"

            # SQL 쿼리 실행
            cursor.execute(insert_sql, (fixed_datetime, fixed_datetime, 1234, 1))

            # 변경 사항 커밋
            self.connection.commit()

    def select_test(self):
        with self.connection.cursor() as cursor:
            # SQL 쿼리 실행
            sql = "SELECT * FROM book Limit 5"
            cursor.execute(sql)

            # 결과 가져오기
            result = cursor.fetchall()
            return result

    def select_book_by_id(self, book_id):
        with self.connection.cursor() as cursor:
            # book_id를 이용하여 해당 책 정보를 조회하는 SQL 쿼리 작성
            sql = f"SELECT * FROM book WHERE product_id = %s"

            # SQL 쿼리 실행
            cursor.execute(sql, (book_id,))

            # 결과 가져오기
            result = cursor.fetchone()
            return result

#         sql = "SELECT id FROM platform WHERE name = %s"
#
#         # SQL 쿼리 실행
#         cursor.execute(sql, ('YT',))
#
#         # 결과 가져오기
#         result = cursor.fetchone()
#         print(result)


# finally:
#     # 데이터베이스 연결 종료
#     connection.close()
#
# print("Data inserted successfully.")

# tes_obj = Mysql_Manager()


'''#플랫폼 추가
tes_obj.insert_platform('YOUTUBE')
'''

'''#카테고리 추가
category_list = ['NEWS', 'IT', 'ANIMAL', 'MUSIC', 'ENTERTAINMENT']
for category in category_list:
    tes_obj.insert_category(category)
'''

'''
#원본 데이터 insert
origin_json_tmp = {
    'hello': "CUCU",
    'book_id': 123421,
}
fixed_datetime = '2024-05-02 02:00:00'

origin_id = tes_obj.insert_origin_data(origin_json_tmp, 'YOUTUBE', 'IT', fixed_datetime)
print(origin_id)
'''

'''
#키워드 추가
keyword = 'xoaxoa'
fixed_datetime = '2024-05-02 02:00:00'
rank_score = 1
category_name = 'IT'

keyword_id = tes_obj.insert_keyword(keyword, rank_score, category_name, fixed_datetime)
print(keyword_id)
'''

'''
tes_obj.insert_trend_source(keyword_id, origin_id, fixed_datetime)
'''

# fixed_datetime = '2024-05-02 02:00:00'
# # tes_obj.test_app()
# #
# daily_recommend_id = tes_obj.insert_daily_recommend(1, fixed_datetime)
#
# tes_obj.insert_recommend_keyword(daily_recommend_id, 2, fixed_datetime)

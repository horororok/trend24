# 실행 방법
1. .env파일을 만든다. 내용의 형식은 다음과 같다.
    ``` shell
    PORT=포트번호
    QDRANT_HOST=qdrant-컨테이너-이름
    ```
2. books.json 파일을 만든다.
    - 책 한 권 데이터의 형식은 다음과 같다. 책 데이터는 모두 한 줄로 이루어져 있다. (중간에 엔터 넣지 말 것)
    ```
    {"product_id": 1, "product_name": "제목1", "category_id": "1", "category_name": "카테고리1", "search_keyword": "키워드1", "total_click_count": 1, "total_order_count": 0, "total_order_amount": 0, "sale_price": 100, "tags": {"topics": ["토픽1", "토픽2"]}, "thema_codes": [{"CodeValue": "01", "CodeDescription": "설명1", "CodeNotes": "", "rerank_score": 0.01}]}
    ```
    - books.json에는 한 줄에 한 권의 책 데이터가 있어야 한다. 여러 권이 있더라도 한 줄의 마지막에 쉼표를 넣으면 안 된다.
    ```
    {book1데이터}
    {book2데이터}
    ```
3. embeddings_topic.npy 파일을 만든다. 사전에 books 데이터를 임베딩한 파일이다.

4. qdrant를 실행한다
    ``` shell
    bash ./run-docker.sh
    ```
5. 데이터를 넣는다
    ``` shell
    bash ./insert_qdrant_data.sh
    ```
6. 만약 데이터를 전부 삭제하고 싶다면 다음 명령어를 실행한다. 이후 4과 5를 다시 실행한다.
    ``` shell
    bash ./delete-qdrant-volume.sh
    ```

## 참고
  - python 버전 3.7.12 사용
  - requirements.txt 만드는 과정
  ``` shell
  pip install tqdm
  pip install numpy
  pip install qdrant_client
  pip install python-dotenv
  pip freeze --all > /app/requirements.txt
  ```
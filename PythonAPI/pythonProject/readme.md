# fastapi
- 실행
    ```commandline
    uvicorn main:app
    ```

1. .env파일을 만든다. 내용의 형식은 다음과 같다.
    ``` shell
    PORT=qdrant-포트번호
    QDRANT_HOST=qdrant-컨테이너-이름
    ```
2. qdrant/embeddings_topic.npy 파일을 만든다. 사전에 books 데이터를 임베딩한 파일이다.


## 참고
  - python 버전 3.7 사용
  - requirements.txt 만드는 과정
  ``` shell
  pip freeze --all > requirements.txt
  ```
# 실행 방법

- windows인 경우 git bash에서 실행시켜야 합니다.
- 현재 디렉터리에 .env 파일이 있어야 합니다.
  - .env 형식
    ``` properties
    # MySQL
    MYSQL_ROOT_PASSWORD=your_root_password
    MYSQL_DATABASE=your_database_name
    MYSQL_USER=your_mysql_user
    MYSQL_PASSWORD=your_mysql_password
    HOST_PORT=3306
    
    # Redis
    REDIS_PASSWORD=your_redis_password
    ```
- 현재 디렉터리에 init.sql이 있어야 합니다. 컨테이너가 생성될 때 실행되는 sql 파일입니다.
  - init.sql 예시
    ``` sql
    -- 데이터베이스 생성
    CREATE DATABASE IF NOT EXISTS trend
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;

    -- 생성된 데이터베이스 사용
    USE trend;

    create table IF NOT EXISTS trend.admin
    (
        id           int auto_increment
            primary key,
        created_time datetime(6)  null,
        updated_time datetime(6)  null,
        admin_id     varchar(100) null,
        admin_pw     varchar(100) null,
        branch       varchar(100) null,
        layout       tinyint      null,
        name         varchar(100) null
    );
    ```
- 현재 디렉터리에서 다음 명령어 실행시키세요. </br>
  ``` shell
  chmod +x docker-compose.sh
  ./docker-compose.sh
  ```


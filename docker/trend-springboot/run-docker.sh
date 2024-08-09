#!/bin/bash

# .env 파일을 읽어 환경 변수로 설정합니다.
source .env

# 설정된 환경 변수를 사용하여 스크립트를 실행합니다.
# echo "PORT is set to $PORT"

# 스크립트 실행 전에 현재 위치를 저장합니다.
original_dir=$(pwd)

# 스크립트 실행 위치를 Backend 디렉토리로 변경합니다.
cd $(dirname "$0")/../../Backend

# 실행 권한 부여
chmod +x gradlew

# gradlew build 명령어를 실행합니다.
./gradlew build

# 스크립트 실행 후에 원래 위치로 돌아갑니다.
# cd "$original_dir"

# 컨테이너가 존재하는지 확인합니다.
if docker ps -a --format '{{.Names}}' | grep -q '^trend-springboot-container$'; then
    # 컨테이너를 삭제합니다.
    docker stop trend-springboot-container
    docker rm trend-springboot-container
    echo "기존 trend-springboot-container를 삭제했습니다."
else
    echo "기존 trend-springboot-container가 존재하지 않습니다."
fi

# 현재 폴더의 Dockerfile을 사용하여 이미지를 빌드합니다.
docker build -t trend-springboot-image .

# 컨테이너를 실행합니다.
docker run -d -p $PORT:8080 --name trend-springboot-container --network trend-network trend-springboot-image

echo "스크립트 끝"
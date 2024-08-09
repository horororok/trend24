#!/bin/bash

# .env 파일을 읽어 환경 변수로 설정합니다.
source .env

CONTAINER_NAME=trend-qdrant-container

# 컨테이너가 존재하는지 확인합니다.
if docker ps -a --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    # 컨테이너를 삭제합니다.
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    echo "기존 $CONTAINER_NAME 를 삭제했습니다."
else
    echo "기존 $CONTAINER_NAME 가 존재하지 않습니다."
fi

# qdrant-volumn이 있는지 확인
VOLUME_NAME="qdrant-volumn"
VOLUME_EXISTS=$(docker volume ls --format "{{.Name}}" | grep "^$VOLUME_NAME$")

if [ -z "$VOLUME_EXISTS" ]; then
    echo "$VOLUME_NAME이 존재하지 않습니다. 새로 생성합니다..."
    docker volume create $VOLUME_NAME
    echo "$VOLUME_NAME이 성공적으로 생성되었습니다."
else
    echo "$VOLUME_NAME이 이미 존재합니다."
fi

# 도커 네트워크가 존재하는지 확인합니다.
if ! docker network inspect trend-network &> /dev/null; then
    # 도커 네트워크를 생성합니다.
    docker network create trend-network
    echo "trend-network 생성"
else
    echo "trend-network는 이미 존재합니다."
fi

# 컨테이너를 실행합니다.
docker run -d -p $PORT:6333 -v $VOLUME_NAME:/qdrant/storage:z --name $CONTAINER_NAME --network trend-network qdrant/qdrant:v1.9.2
echo "$CONTAINER_NAME 컨테이너를 실행합니다."

echo "스크립트 끝"
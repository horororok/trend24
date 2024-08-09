#!/bin/bash

CONTAINER_NAME=qdrant-python-script-container

# 컨테이너가 존재하는지 확인합니다.
if docker ps -a --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    # 컨테이너를 삭제합니다.
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    echo "기존 $CONTAINER_NAME 를 삭제했습니다."
else
    echo "기존 $CONTAINER_NAME 가 존재하지 않습니다."
fi

docker build -t qdrant-python-script .
docker run -d --network trend-network --name $CONTAINER_NAME qdrant-python-script

echo "$CONTAINER_NAME 실행 완료"
echo "컨테이너가 종료되었는지 5초마다 확인합니다."
# 컨테이너가 종료될 때까지 로그를 확인합니다.
while true; do
    if docker ps --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
        echo "$(date +"%Y-%m-%d %H:%M:%S") - $CONTAINER_NAME 가 실행 중입니다."
    else
        echo "$(date +"%Y-%m-%d %H:%M:%S") - $CONTAINER_NAME 가 종료되었습니다."
        break
    fi
    sleep 5  # 5초마다 확인합니다.
done

echo "스크립트 종료"
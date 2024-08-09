#!/bin/bash

# qdrant-volumn이 있는지 확인
VOLUME_NAME="qdrant-volumn"
VOLUME_EXISTS=$(docker volume ls --format "{{.Name}}" | grep "^$VOLUME_NAME$")


if [ -z "$VOLUME_EXISTS" ]; then
    echo "qdrant-volumn이 존재하지 않습니다."
else
    # 볼륨을 사용 중인 컨테이너 확인
    CONTAINERS=$(docker ps -q -f volume=${VOLUME_NAME})

    # 볼륨을 사용 중인 컨테이너가 있는지 확인
    if [ -z "${CONTAINERS}" ]; then
        echo "볼륨을 사용 중인 컨테이너가 없습니다."
    else
        echo "볼륨을 사용 중인 컨테이너가 있습니다:"
        # docker ps -f volume=${VOLUME_NAME}

        # 사용자에게 삭제할 것인지 확인
        read -p "볼륨을 사용 중인 컨테이너를 삭제하시겠습니까? (y/n): " choice
        case "$choice" in 
            y|Y ) 
                CONTAINER="trend-qdrant-container"
                # 사용 중인 컨테이너 삭제
                docker stop ${CONTAINER} && docker rm ${CONTAINER}
                echo "컨테이너가 삭제되었습니다."
                ;;
            n|N ) 
                echo "작업이 취소되었습니다."
                exit
                ;;
            * ) 
                echo "잘못된 입력입니다. 작업이 취소되었습니다."
                exit
                ;;
        esac
    fi



    # if [ "$CONTAINER_COUNT" -eq 0 ]; then
    #     echo "볼륨이 사용 중이지 않습니다."
    # else
    #     echo "볼륨을 사용 중인 컨테이너가 있습니다."
    #     echo -n "계속하시겠습니까? (y/n): "
    #     read -r CONFIRMATION

    #     if [ "$CONFIRMATION" == "y" ]; then
    #         echo "사용 중인 컨테이너를 중지하고 삭제합니다."
    #         # 볼륨을 사용 중인 컨테이너 확인
    #         CONTAINERS=$(docker ps -q -f volume=${VOLUME_NAME})

    #         # 볼륨을 사용 중인 컨테이너 중지 및 삭제
    #         docker ps -q -f volume=$VOLUME_NAME | xargs -r docker stop
    #         docker ps -q -f volume=$VOLUME_NAME | xargs -r docker rm

    #         echo "컨테이너가 정상적으로 삭제되었습니다."
    #     else
    #         echo "작업이 취소되었습니다."
    #         exit 1
    #     fi
    # fi

    docker volume rm $VOLUME_NAME
    echo "qdrant-volumn이 삭제되었습니다"
fi

echo "qdrant-volumn 삭제 스크립트를 종료합니다."
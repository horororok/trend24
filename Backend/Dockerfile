FROM openjdk:17

WORKDIR /app

COPY ./build/libs/trend-0.0.1-SNAPSHOT.jar /app/trend-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "trend-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080

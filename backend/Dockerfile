FROM eclipse-temurin:21-jdk as build

COPY . .

RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

RUN ./mvnw clean install

FROM eclipse-temurin:21-jdk-alpine

COPY --from=build ./target/demo-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
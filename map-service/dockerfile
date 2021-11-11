FROM maven:3-jdk-11-slim

WORKDIR /app

# Copy required project files
COPY src /app/src
COPY pom.xml /app

# Set enivornment variables
ARG DB_URL
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DOMAIN
ARG AUDIENCE

# Build for production
RUN mvn -Dspring.profiles.active=prod -DDB_URL=${DB_URL} -DDB_USERNAME=${DB_USERNAME} -DDB_PASSWORD=${DB_PASSWORD} -DDOMAIN=${DOMAIN} -DAUDIENCE=${AUDIENCE} --update-snapshots package

# Start
CMD ["java","-jar","/app/target/map-service-0.0.1-SNAPSHOT.jar"]

# Semester 3
[<- back to home](../README.md)

## Table of contents
- [About](#About)
- [Learning outcomes](#Learning-outcomes)
	- [Web application](#Web-application)
	- [Software quality](#Software-quality)
	- [CI/CD](#CI-CD)
	- [Professional](#Professional)
- [Research](#Research)
- [Reflection](#Reflection)

## About
An “infinite“ map focused on mainly storing notes that could come in handy some day. These notes can be linked together to create a structure of similar information. By using a map there is no need for opening any other windows which cuts down on clicking around and losing track of other relevant information. The idea came from always learning new things and wanting to keep track of that information in a way that’s very accessible.

## Learning-outcomes

### Web-application

### Software-quality

### CI-CD
_(keep in mind that testing still needs to be implemented)_

**GitHub actions**
All of this projects workflows start like this. I set the workflow name and trigger it on a pull request to the production branch. I define a single job that both builds and deploys the application.
```
name: CI/CD
on:
  pull_request:
    branches: production
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
```
After this however things start to look different. Because I have React client, Spring Boot service and a second service in Rust every application has to be build differently.
For the client that looks like:
```
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
    with:
      node-version: 12

    - name: Install node-modules
    run: npm ci

    - name: Build
    run: npm build
```
For the Spring Boot service:
```
    steps:
    - uses: actions/checkout@v2
    - name: Set up JDK 11
    uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
        cache: maven

    - name: Build with Maven
    run: mvn --update-snapshots verify
```
For the Rust service:
```
    steps:
    - uses: actions/checkout@v2
    - name: Update local toolchain
    run: |
      rustup update
      rustup install nightly

    - name: Toolchain info
    run: |
      cargo --version
      rustc --version
```
After this the workflows are pretty much the same only the --build-args are different. It builds the docker image, logs-in- and pushes to the remote registry and finally releases the new container.
```
    - name: Build Docker image
    run: docker build -t registry.heroku.com/${{ secrets.HEROKU_APP }}/web:latest
      --build-arg DOMAIN=${{ secrets.INFO_MAP_AUTH0_DOMAIN }}
      --build-arg AUDIENCE=${{ secrets.INFO_MAP_AUTH0_AUDIENCE }}
      --build-arg DB_URL=${{ secrets.DB_URL }}
      --build-arg DB_USERNAME=${{ secrets.DB_USERNAME }}
      --build-arg DB_PASSWORD=${{ secrets.DB_PASSWORD }} .

    - name: Docker image info
    run: docker images

    - name: Login to container registry
    env:
      HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
    run: heroku container:login

    - name: Push Docker image
    run: docker push registry.heroku.com/${{ secrets.HEROKU_APP }}/web

    - name: Release
    env:
      HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
    run: heroku container:release -a ${{ secrets.HEROKU_APP }} web
```

files: [client-pipeline](code/workflows/client/pipeline.yml), [map-service-pipeline](code/workflows/map-service/pipeline.yml), [notes-service-pipeline](code/workflows/notes-service/pipeline.yml)

**Dockerfiles**

As for my dockerfiles they're completely different to each other. My client and map-service both use just a single stage, which means that those final images are quite large and less secure, because there's a lot more tooling available on them. For my notes-service dockerfile I made use of a multistage process. First I get a base image with all the necessary tooling to build my app, and then I pull a new image which is very small. Then I copy everything over that's needed to run the application and start the application from ENTRYPOINT, because using CMD won't work without a shell.

files: [client-dockerfile](code/workflows/client/dockerfile), [map-service-dockerfile](code/workflows/map-service/dockerfile), [notes-service-dockerfile](code/workflows/notes-service/dockerfile)

### Professional

## Research


## Reflection
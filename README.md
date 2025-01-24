## Commands to setup

#### Root directory: 
```
npm install
```

Create a common network for the containers to communicate: 
```
docker network create dropbox_network
```

Build prod using new BuildKit engine
```
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build
```

Run and build the docker image, and start a local S3 bucket
```
docker compose -f docker-compose.yml up -d --build   
aws --endpoint-url=http://localhost:4566 s3 mb s3://dropbox-local-bucket
```

Open `http://localhost:3001/`, serves both frontend and backend


```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```
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

Install awslocal if you dont already have 
```
pip install awscli-local
```

Run and build the docker image, and create a local S3 bucket
```
docker compose -f docker-compose.yml up -d --build   
aws --endpoint-url=http://localhost:4566 s3 mb s3://dropbox-local-bucket
```

Open `http://localhost:3001/`, serves frontend


```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```


For development, just run the docker-dev.yml file using the following command: 
```
docker compose -f docker-dev.yml up -d --build   
aws --endpoint-url=http://localhost:4566 s3 mb s3://dropbox-local-bucket

```

and then run 
``` npm run dev ```
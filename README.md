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

Start prod in detached mode
```
docker-compose -f docker-compose.yml up -d
```

Open `http://localhost:3001/`, serves both frontend and backend


```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```
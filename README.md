# Quick Start
This is an expressjs hosted static site. By defaul it serves on all interfaces and on port 3000.

It assumes that content resolves to the ./public folder. i.e. http://hostname:port/index.html would resolve to ./index.html

Details
# You can configure the interface and port with the following env vars:

```console
PORT=3001
HOST=10.19.0.1
```

Google and Chrome are beginning to score non-TLS sites lower and warning of insecure access. This is primarily why the default port is not 80. The choice of port 3000 is informed by Docker microservices where one or two ports exposed is sufficient and 3000 is usually the service endpoint.

I suggest implementing a reverse proxy to provide SSL termination. Nginx works well, is easy to set up and maintain, and is performant. It is suitable for most cases where traffic is reasonable (don't know exact figures - I would expect a setup to cope fine for 300 requests per second). Any higher loads should be possible to resolve with a load balancer and additional servers. 

## Server hosting
The serer assumed a minimum level of node 8. To start the server, make sure that the required port is open and start the server with:

```console
npm start
```

Alternatively, keep the port closed (search ufw if on ubuntu) and open port 443 and 80 for the reverse proxy.

## Docker hosting

```shell
# build the image
npm run docker:build

# run in docker
npm run docker:run 

# publish to a container repo
npm run docker:publish

# Use with docker-compose
docker-compose up
```

# Docker compose configuration

IMAGE_NAME - this is the image name as published to your container registry

CONTAINER_NAME - this is the name you would like the container to take.

NETWORK_NAME - the network you would like to the container to join. Since this container is serving http traffic, you might wish to join it to a user defined docker bridge network and to then also join the reverse proxy to the same network so that traffic between them is restricted to containers on the bridge network

Docker bypasses local firewalls such as ufw, opening the ports on all interfaces if you expose a port. The container may be mounted to a specific interface but the port on other interfaces is still opened when unbound. As such you may prefer to force traffic over the bridge network to avoid an unnecessarily opened port on your host as well as making sure users are forced over TLS so they don't expose informatino about themseves (for example by submitting a contact form implemented using client side js)

To join a container to a user defined network, create it first using docker network create. If you aren't sure, rtm. You can also simply run docker-compose up and docker will give you the command you need to create the network first.

Note that docker compose doesn't pick up env vars the same way that node does. You will need to export them rather than simply adding to them ahead of your command. e.g.:

export PORT=3001 && export NETWORK_NAME=my-user-defined-network && export IMAGE_NAME=my.image.v1.0.1 && docker-compose up

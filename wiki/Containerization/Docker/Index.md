## Overview
Docker is a tool that allows virtualization of software in containers. Containers hold all software, runtimes, and libraries needed for the applicaton to run. This process allows to easily deploy or share an app as 1 isolated unit.

### Quick Start
First, you need to create a `Dockerfile` that will dictate the base dependencies/runtime of the application and customize how the container will start. This is basically a template (or image) of the things needed to run the application.

Use `docker build -t <image> .` to create an image. Check if the image was created with `docker images`

Now you are ready to start a container, execute `docker run --name <container> <image>` 
* use `-d` for detached mode
* if your container is existing with an error, add `-a STDERR` to the command to view the error

Use `docker ps -a` to view your all of your containers and thier statuses

### Publishing to Docker Hub
To publish your image, the image name should be prefixed with the account you are publishing to `ie. oleg3790/myimage`. 

1. Login to docker using `docker login`
2. Execute `docker push <user>/<image>:<tag>` to publish

## Inspect container filesystem
Use `docker exec -t -i <container> bash`

## Accessing app outside of container
IF you are developing a web app and need it to be accessible outside of your container, you can expose certain ports by mapping a container port to a docker host port by using the `-p` command line argument. 

`docker run -p <host_port>:<container_port> <container> (i.e. docker run -p 80:80 <container>)`

Now you can access the app using http://localhost:80

*If using `docker-machine`*
You will need to obtain the IP address of the VM by using `docker-machine ip <machine>` and use that as the address for which to access your containerized app
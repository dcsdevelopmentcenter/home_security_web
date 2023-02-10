#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

#check and create working directory
DIR="/home/ec2-user/security-app"
if [-d "$DIR" ]; then
    echo "${DIR}" exist
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi
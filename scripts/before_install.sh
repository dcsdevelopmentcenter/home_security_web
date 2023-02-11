#!/bin/bash

#check and create working directory
DIR="/home/ec2-user/security-app"
if [-d "$DIR" ]; then
    echo "${DIR}" exist
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi
#download node and npm
cd /home/ec2-user/security-app
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
yum -y install nodejs npm

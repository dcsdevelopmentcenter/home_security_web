#!/bin/bash
sudo chmode -R 777 /home/ec2-user/security-app
cd /home/ec2-user/security-app/src
npm start

#add npm and node to directory
export NVM_DIR="$HOME/.nvm"
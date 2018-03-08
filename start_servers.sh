#!/bin/bash

echo "Starting Cinder Server"
cd server
sh create_env.sh
cat create_env.sh
npm install
npm start &
echo "Starting Web Server"
cd ../web
npm install
npm run build
npm install serve -g
serve build
echo "Server startup finished."

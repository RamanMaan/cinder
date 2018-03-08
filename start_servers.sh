#!/bin/bash

echo "Starting Cinder Server"
cd server
echo $ENV
echo $DB_HOST
sh create_env.sh
cat .env
npm install
npm start &
echo "Starting Web Server"
cd ../web
npm install
npm run build
npm install serve -g
serve build
echo "Server startup finished."

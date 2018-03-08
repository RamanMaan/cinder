#!/bin/bash

echo "Starting Cinder Server"
cd server
sh create_env.sh

# Add Test Data
npm run db:dev

npm install
npm start &
echo "Starting Web Server"
cd ../web
npm install
npm run build
npm install serve -g
serve build
echo "Server startup finished."

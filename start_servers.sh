#!/bin/bash

echo "Starting Cinder Server"
cd server
npm install
npm start &
echo "Starting Web Server"
cd ../web
npm run build
npm install serve -g
serve build
echo "Server startup finished."

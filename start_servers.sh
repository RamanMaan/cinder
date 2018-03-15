#!/bin/bash

echo "Starting Cinder Server"
cd server
sh create_env.sh
npm install
# Add Test Data
echo "Adding test data to the database"
npm run db:dev
npm start &
echo "Starting Web Server"
cd ../web
npm install
npm run build
npm install serve -g
serve build
echo "Server startup finished."

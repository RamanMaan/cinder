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
npm start
echo "Server startup finished."

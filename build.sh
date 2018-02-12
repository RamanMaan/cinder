#!/bin/bash
# A script to build project database

echo "╔═══════════════════════╗"
echo "║ Running Initial Build ║"
echo "╚═══════════════════════╝"
cd server/db
echo $PWD

#TODO make user define user and password in args
./build_db.sh cinder user password
./add_test_data.sh cinder user password

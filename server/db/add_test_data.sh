#!/bin/bash
# This script empties the database and loads test data into it
# usage: ./add_test_data.sh [database name] [username to create] [password to create]

echo "╔══════════════════════════════╗"
echo "║ Adding Test Data to Database ║"
echo "╚══════════════════════════════╝"

mysql -u$2 -p$3 $1 < test-data.sql

exit

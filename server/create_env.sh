#!/bin/bash
echo "NODE_ENV=$ENV

# The port the server will run on
SERVER_PORT=$SERVER_PORT

# The name of the database. If the database hasn't been created yet, the server will create a database with this name
DB_NAME=$DB_NAME

# The MYSQL host
DB_HOST=$DB_HOST

# The user the server will use in its database accesses. Should not be root
DB_USER=$DB_USER
DB_PASS=$DB_PASSWORD

# The root password, used in database & user creation
MYSQL_ROOT_PASS=$DB_ROOT_PASSWORD
" > .env
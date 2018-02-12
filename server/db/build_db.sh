#!/bin/bash
# This script initializes the database and a user to access it, then loads the database schema
# usage: ./build_db.sh [database name] [username to create] [password to create]

echo "╔═══════════════════════╗"
echo "║ Initializing Database ║"
echo "╚═══════════════════════╝"

# If /root/.my.cnf exists then it won't ask for root password
if [ -f /root/.my.cnf ]; then
  echo "Creating $1 database..."
  mysql -e "CREATE DATABASE $1 /*\!40100 DEFAULT CHARACTER SET utf8 */;"
  echo "$1 database successfully created! Showing existing databases:"
  mysql -e "show databases;"
  echo ""
  echo "Creating $2 user..."
  mysql -e "CREATE USER $2@localhost IDENTIFIED BY '$3';"
  echo "$2 user successfully created!"
  echo ""
  echo "Granting ALL privileges on $1 to $2!"
  mysql -e "GRANT ALL PRIVILEGES ON $1.* TO '$2'@'localhost';"
  mysql -e "FLUSH PRIVILEGES;"
  echo "Database and user created. Be sure to update your .env file accordingly."
  
  echo "╔═══════════════════════════╗"
  echo "║ Building Database Schemas ║"
  echo "╚═══════════════════════════╝"
  mysql -u$2 -e "USE $1;"
  mysql -u$2 $1 < setup.sql;

  exit
  
# If /root/.my.cnf doesn't exist then it'll ask for root password
else
  echo "Please enter root user MySQL password!"
  read rootpasswd
  echo "Creating $1 database..."
  mysql -uroot -p${rootpasswd} -e "CREATE DATABASE $1 /*\!40100 DEFAULT CHARACTER SET utf8 */;"
  echo "$1 database successfully created! Showing existing databases:"
  mysql -uroot -p${rootpasswd} -e "show databases;"
  echo ""
  echo "Creating $2 user..."
  mysql -uroot -p${rootpasswd} -e "CREATE USER $2@localhost IDENTIFIED BY '$3';"
  echo "$2 user successfully created!"
  echo ""
  echo "Granting ALL privileges on $1 to $2!"
  mysql -uroot -p${rootpasswd} -e "GRANT ALL PRIVILEGES ON $1.* TO '$2'@'localhost';"
  mysql -uroot -p${rootpasswd} -e "FLUSH PRIVILEGES;"
  echo "Database and user created. Be sure to update your .env file accordingly."

  echo "╔═══════════════════════════╗"
  echo "║ Building Database Schemas ║"
  echo "╚═══════════════════════════╝"
  mysql -u$2 -p$3 $1 < setup.sql;

  exit
fi

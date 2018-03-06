# Database Configuration

- Database: MySQL v5.7.21

## To create database and all tables
While in the `/server` directory:
```
 npm run db:build
```

Or use [setup.sql](setup.sql) directly:

``` mysql -u [username] -p [database name] < setup.sql```

## To insert all test data
```
 npm run db:addTestData
```

# To create database and initialize it AND insert test data:
```
 npm run db:dev
```

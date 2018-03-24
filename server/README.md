Server
---

This server interfaces with the database and serves clients content through an API.

A Node.js server, leveraging Express for route management and MySQL for the database.

How To Run
---
_Note: The server requires a MySQL instance running on the host machine with a .env file configured with the required variables listed in the .env.example file_

### 1) [Install MYSQL according to your OS's specifications](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/installing.html)

### 2) Configure .env variables
Create a ```.env``` file in the server root directory with variables from the [```.env.example```](.env.example) file. Set these variable values to whatever you prefer.

### 3) Build the database
From server root directory:

    npm install
    npm run db:build

To add test data:

    npm run db:dev

### 4) Run the server
From server root:

    npm start

How To Run Tests
---
From server root:

    npm install
    npm test

Structure
---
```
└── server/
    ├── server.js                       # manages the Node server handling the API
    ├── .env                            # contains environment specific values. THIS IS NOT COMMITED
    ├── .env.example                    # an example of a .env file with the required variables
    ├── db/                             # database configuration files
    |   ├── setup.sql                   # defines database schema
    |   ├── referenceData.js            # defines reference data default values
    |   └── utils/                      # utilities for database management
    |       ├── generateTestData.js     # scrapes the animal crossing wiki and generates test data
    |       ├── build_db.js             # builds the database, a user to access it, and applies the schema
    |       └── add_test_data.js        # adds the test data to the database
    └── _api/
        ├── __api.js                    # api controller - this controls api routes/endpoints
        ├── responses.js                # a collection of HTTP responses we use
        ├── __*.js                      # * endpoints
        ├── util.js                     # API utility functions
        └── db/                         # each endpoints data access
            ├── *.js                    # * related data access functions
            ├── *.test.js               # * related tests
            └── *.testdata.js           # * related test data
```

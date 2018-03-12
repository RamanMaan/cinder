Server
---

This server manages the database and communicates with the clients through its API.

A Node.js server, leveraging Express for route management and MySQL for the database.

How To Run
---
_Note: The server requires a MySQL instance running on the host machine with a .env file configured with the required variables listed in the .env.example file_

Install MYSQL according to your OS's specifications.

### Configure .env variables
Setup a ```.env``` file in the server root directory with variables from the ```.env.example``` file. Set these variable values to whatever you prefer.

### Build the database
From server/ root:

    npm install
    npm run db:build

To add test data:

    npm run db:dev

### Run the server
From server root:

    npm start

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
        ├── __users.js                  # user endpoints
        ├── __matches.js                # match endpoints
        ├── __recs.js                   # recommendation endpoints
        ├── __ref.js                    # ref table endpoints
        ├── __tasks.js                  # server task endpoints
        ├── responses.js                # a collection of HTTP responses we use
        ├── util.js                     # API utility functions
        └── db/                         # each endpoints data access
            ├── matches.js              # match data access
            ├── recs.js                 # recommendation data access
            ├── ref.js                  # reference table data access
            └── users.js                # user data access
```

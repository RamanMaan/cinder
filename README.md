        # cinder 
        #       ## Because everyone deserves a cinder-ella story...
[![Build Status](https://travis-ci.com/Raman-Maan/cinder.svg?token=yW9dwYrw65cdrdXoS86Y&branch=master)](https://travis-ci.com/Raman-Maan/cinder)

Project Structure
---
```
├── server/                             # contains our web server
|   ├── server.js                       # manages the Node server handling the API and serving app content
|   ├── .env                            # contains environment specific values. THIS IS NOT COMMITED
|   ├── .env.example                    # an example of a .env file with the required variables
|   ├── db/                             # database configuration files
|   |   ├── setup.sql                   # defines database schema
|   |   ├── referenceData.js            # defines reference data default values
|   |   └── utils/                      # utilities for database management
|   |       ├── generateTestData.js     # scrapes the animal crossing wiki and generates test data
|   |       ├── build_db.js             # builds the database, a user to access it, and applies the schema
|   |       └── add_test_data.js        # adds the test data to the database
|   └── _api/
|       ├── _api.js                     # api controller - this controls api routes/endpoints
|       └── user.js                     # user related endpoints
├── client/                             # contains our client-side code
|   ├── public/
|   |   ├── index.html                  # the root page of the React app
|   |   └── manifest.json               # contains config options for android devices
|   └── src/
|       ├── index.js                    # initializes the app
|       ├── api.js                      # API requests are organized in here
|       ├── components/                 # React components are kept here
|       |   └── ...
|       ├── containers/                 # React containers are kept here - reference components
|       |   └── ...
|       ├── assets/
|       |   └── ...
|       └── utils/
|           └── ...
└── mobile/                             # contains our mobile application
    ├── app.js                          # entry point of app
    ├── setup.js                        # runs housekeeping - initial app setup before running app
    └── src/
        ├── app.js                      # standard app route
        ├── components/                 # React components are kept here
        |   └── ...
        ├── containers/                 # React containers are kept here - pages
        |   └── ...
        ├── theme/                      # Native Base theme files live here
        |   └── ...
        └── assets/
            └── ...
```

How To Run
---
Whether you're running the web client or the mobile client, both will require the server to be running.

Setup a ```.env``` file in the server root directory with variables from the ```.env.example``` file. Set these variable values to whatever you prefer.

Install MYSQL according to your OS's specifications.

Setup database:

    cd server
    npm run db:build
    
    Note: to add test data as well run: npm run db:dev

To run server:

    cd server
    npm start

- Note: The server requires a MySQL instance to be running on the host machine. A .env file should be configured with the required variables listed in the .env.example file

To run web client:

    cd client
    npm start

To run mobile client:

    cd mobile
    npm start

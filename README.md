# cinder 
### Because everyone deserves a cinder-ella story...
[![Build Status](https://travis-ci.com/Raman-Maan/cinder.svg?token=yW9dwYrw65cdrdXoS86Y&branch=master)](https://travis-ci.com/Raman-Maan/cinder)

Project Structure
---
```
├── server/                     # contains our web server
|   ├── server.js               # manages the Node server handling the API and serving app content
|   ├── db/                     # database configuration files
|   |   ├── setup.sql           # creates all tables
|   |   └── test-data.sql       # inserts all test data
|   └── _api/
|       ├── _api.js             # api controller - this controls api routes/endpoints
|       └── user.js             # user related endpoints
├── client/                     # contains our client-side code
|   ├── public/
|   |   ├── index.html          # the root page of the React app
|   |   └── manifest.json       # contains config options for android devices
|   └── src/
|       ├── index.js            # initializes the app
|       ├── api.js              # API requests are organized in here
|       ├── components/         # React components are kept here
|       |   └── ...
|       ├── containers/         # React containers are kept here - reference components
|       |   └── ...
|       ├── assets/
|       |   └── ...
|       └── utils/
|           └── ...
└── mobile/                     # contains our mobile application
    ├── app.js                  # entry point of app
    ├── setup.js                # runs housekeeping - initial app setup before running app
    └── src/
        ├── app.js              # standard app route
        ├── components/         # React components are kept here
        |   └── ...
        ├── containers/         # React containers are kept here - pages
        |   └── ...
        ├── theme/              # Native Base theme files live here
        |   └── ...
        └── assets/
            └── ...
```

How To Run
---
Whether you're running the web client or the mobile client, both will require the server to be running.

Setup a ```.env``` file in the server root directory with variables from the ```.env.example``` file. Set these variable values to whatever you prefer.

Run build script to initialize MySQLDB

    ./build.sh

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

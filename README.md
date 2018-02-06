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
    ├── components/             # React components are kept here
    |   └── ...
    ├── containers/             # React containers are kept here - pages
    |   └── ...
    ├── assets/
    |   └── ...
    └── utils/
        └── ...
```

How To Run
---
```npm run dev``` in the ./server/ directory

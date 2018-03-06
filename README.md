# cinder
### Because everyone deserves a cinder-ella story...
[![Build Status](https://travis-ci.com/Raman-Maan/cinder.svg?token=yW9dwYrw65cdrdXoS86Y&branch=master)](https://travis-ci.com/Raman-Maan/cinder)

Project Structure
---
```
├── server/                             # contains our web server and database
|   └── ...
├── web/                                # contains our web-client code
|   └── ...
└── mobile/                             # contains our mobile application
    └── ...
```

How To Run
---
**Whether you're running the web client or the mobile client, both will require the server to be running.**

_More detailed instructions are included in each folders README._

### Installation/Setup

1) Setup a ```.env``` file in the ```server``` directory from the ```.env.example``` file.
2) Setup database:
```
    cd server
    npm install
    npm run db:build
    
    npm run db:dev # this installs test data, optional
```

### Run Server:

    cd server
    npm start

- Note: The server requires a MySQL instance to be running on the host machine. A .env file should be configured with the required variables listed in the .env.example file

### Run Web Client:

    cd web
    npm start

### Run Mobile Client

    cd mobile
    npm start

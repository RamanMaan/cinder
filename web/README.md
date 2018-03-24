Web Client
---

This is the cinder web client.

Built in React.js, utilizing Redux.

How To Run
---
_Note: Requires the server to be running_

### 1) Install dependencies
```
    npm install
```

### 2) Run CRA Server
```
    npm start
```

How to Run Tests
---
From web root:

    npm install
    npm test
 
How to Run System Tests
---
From web root:

    npm run start-selenium
    npm run system-tests
 
Structure
---
```
└── web/                                  # contains our web-client code
    ├── public/
    |   ├── index.html                    # the root page of the React app
    |   └── manifest.json                 # contains config options for android devices
    ├── system_tests/                     # where our system tests live
    |   └── ...                         
    └── src/  
        ├── index.js                      # initializes the app
        ├── setupTests.js                 # this file is a reserved CRA file - run before Jest tests
        ├── components/                   # React components are kept here - only display data
        |   └── ...
        ├── containers/                   # React containers are kept here - control data
        |   └── ...
        ├── actions/                      # redux actions/types
        |   └── ...
        ├── reducers/                     # redux reducers
        |   └── ...
        ├── store/                        # redux store - history
        |   └── ...
        ├── assets/
        |   └── ...
        └── utils/
            └── registerServerWorker.js
```

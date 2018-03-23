Mobile Client
---

This is the cinder mobile client.

Built with React Native, this will create a native app for both iOS and Android. Feel free to run it with whichever device you'd like.

How To Run
---
_Note: Requires the server to be running_

### 1) Setup env.js file
After running the server, you'll see output along the lines of:
```
> cinder@0.1.0 start /home/raman/_repos/cinder/server
> node server.js

Server started on address: 192.168.0.12
cinder server started on port 5000
```
We're interested in the `Server started on address: 192.168.0.12` line. You'll want to copy the address over to the env.js file, replacing the address that is in there while keeping the :5000 port number. So for this example our env.js would look like:
```
export const serverURL = 'http://192.168.0.12:5000';
```

### 2) Install dependencies
From mobile root:
```
    npm install
```

### 3) Run the app
From mobile root:
```
    npm start
```

From here you have two ways to launch the application.
#### Option 1: Expo App
  - Install the Expo app from your specific app market
  - Once installed, scan the QR code printed in the terminal in step 3 with the Expo app

#### Option 2: Emulator
  - If emulating iOS:
```
    # if the server already started from Step 3:
    i
    # if the server has not been started:
    npm run ios
```
  - If emulating Android:
```
    # Launch the emulator first via AVD
    ~/Android/Sdk/tools/emulator -avd [AVD_NAME]    
    # if the server already started from Step 3:
    a
    # if the server has not been started:
    npm run android
```

How To Run Tests
---
From mobile root:

    npm install
    npm test


Structure
---
```
└── mobile/
    ├── App.js                          # entry point of app
    ├── setup.js                        # runs housekeeping - initial app setup before running app
    ├── env.js                          # contains environment variables
    └── src/
        ├── app.js                      # standard app route
        ├── components/                 # React components are kept here
        |   └── ...
        ├── containers/                 # React containers are kept here - pages
        |   └── ...
        ├── theme/                      # Native Base theme files live here
        |   └── ...
        ├── reducers/                   # Redux reducers
        |   └── ...
        ├── actions/                    # Redux actions
        |   └── ...
        ├── store/                      # Redux store
        |   └── ...
        └── assets/
            └── ...
```

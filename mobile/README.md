Mobile Client
---

This is the cinder mobile client.

Built with React Native, this will create a native app for both iOS and Android.

How To Run
---
_Note: Requires the server to be running_

### Option 1: Expo App

  - Install the Expo app from your specific app market
  - Then from mobile folder:

    npm install
    npm start

  - And scan the QR code with the Expo app

### Option 2: Emulator

    npm install
    npm run android/ios         # whichever respective emulator you're trying to run

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

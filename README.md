# cinder
### Because everyone deserves a cinder-ella story...

Project Structure
---
```
├── server/                     # contains our web server
|   ├── server.js               # manages the Node server handling the API and serving app content
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
|       ├── images/
|       |   └── ...
|       └── utils/
|           └── ...
└── mobile/                     # contains our mobile application
    └── ...TODO
```

How To Run
---
```npm run dev``` in the ./server/ directory

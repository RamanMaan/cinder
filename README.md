# cinder
### Because everyone deserves a cinder-ella story...

Project Structure
---
```
├── web/                        # contains our web application
|   ├── package.json            # contains application information for node - scripts, dependencies
|   ├── package-lock.json       # contains more specific dependency versions
|   ├── server.js               # manages the Node server handling the API and serving app content
|   ├── _api/
|   |   ├── _api.js             # api controller - this controls api routes/endpoints
|   |   └── user.js             # user related endpoints
|   └── client/                 # contains the client-side React code
|       ├── package.json
|       ├── package-lock.json
|       └── ...TODO
├── mobile/                     # contains our mobile application
|   └── ...TODO

COMP4350 Group 7

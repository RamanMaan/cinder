const express = require('express');
const ifaces = require('os').networkInterfaces();
const bodyParser = require('body-parser');
require('dotenv').load();

const app = express();
const port = process.env.SERVER_PORT || 5000;

const api = require('./_api/__api.js');

// Need body parser to get info from POST
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Attach api routes to app
app.use('/api/', api);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`cinder server started on port ${port}`));

// print out the current server IP address if doing dev
if(process.env.NODE_ENV === 'development') {
  const getLocalExternalIP = () => [].concat(...Object.values(ifaces))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address;

  console.log(`Server started on address: ${getLocalExternalIP()}`);
}

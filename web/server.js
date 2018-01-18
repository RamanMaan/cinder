const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const api = require('./_api/_api.js');

// Attach React Router to app
// TO-DO

// Attach api routes to app
app.use('/api/', api);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`cinder Server started on port ${port}`));

/**
 * This is the API endpoint for current user operations
 */
const express = require('express');

const router = express.Router();

/**
 * This endpoint is an example endpoint that takes the current user and gets some data with it
 * View this at: localhost:5000/api/user/example
 */
router.get('/example', (req, res) => {
  // Note: This is an example of a promise using some data controller
  // ExampleController.getSomeDate(req.user)
  // .then(data => {
  //   // once the data is received, send it with a server 200 response as a json file
  //   res.status(200).json(data);
  // });
  res.status(200).json({
    example:
      'This is an example - this was sent from the server!!! From endpoint /api/user/example!',
    data: ["Here's", 'Some', 'Date']
  });
});

module.exports = router;

const express = require('express');

const application = express();


application.use((req, res, next) => {
  res.send('Express work');
  next();
});


module.exports = application;

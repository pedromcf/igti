const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('ola');
});

app.listen(3000, function () {
  console.log('Api Started!');
});

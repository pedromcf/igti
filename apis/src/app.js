const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Olá, Mundo!'));
app.post('/', (req, res) => res.send('Olá, Mundo Post!'));

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});

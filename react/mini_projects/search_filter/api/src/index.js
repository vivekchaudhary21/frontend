const express = require('express');
const cors = require('cors');
const Users = require('./users');

const PORT = 4000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send(Users);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

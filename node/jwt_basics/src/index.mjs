import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.get('/', function (req, res) {
  const token = jwt.sign({ user: 1 }, 'secretkey', {
    expiresIn: 120,
  });
  res.send({ token });
});

app.get('/account-details', function (req, res) {
  const { token } = req.query;
  const decodedToken = jwt.verify(token, 'secretkey');
  if (decodedToken.user === 1) {
    res.send({
      user: 1,
      accoutNumber: 12346789876543,
      balance: '$24',
    });
    return;
  }
  res.send({
    message: 'You are unauthorized',
  });
});

app.listen(4000, function () {
  console.log('Server running on port 4000');
});

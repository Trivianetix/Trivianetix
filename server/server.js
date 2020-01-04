const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const signupRouter = require('./routes/signup');

app.use(express.json())

app.use('/signup', signupRouter);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

app.get('/build/bundle.js', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../build/bundle.js'))
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

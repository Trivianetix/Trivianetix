const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))

// app.get('/api', (req, res) => {
//   res.send('hi');
// })

app.use('/signup', signupRouter);

app.use('/profile', profileRouter);

app.use('/', loginRouter);

// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
// })

app.get('/build/bundle.js', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../build/bundle.js'))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

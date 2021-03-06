const express = require('express');
const app = express();
const colors = require('./routes/colors');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());
app.use('/colors', colors);

app.use(notFound);

app.use(handler);

module.exports = app;

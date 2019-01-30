const { Router } = require('express');
const Color = require('../models/Colors');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    Color.create({
      handle,
      text
    }, (err, createdColor) => {
      if(err) return next(err);
      res.send(createdColor);
    });
  })
  .get('/', (req, res, next) => {
    Color.find((err, listOfColors) => {
      if(err) return next(err);
      res.send(listOfColors);
    });
  });
  

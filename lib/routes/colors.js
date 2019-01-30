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
  })

  .get('/:id', (req, res, next) => {
    Color.findById(req.params.id, (err, color) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad Id: ${req.params.id}`));
        } else {
          return next(err);
        }
      }
      res.send(color);
    });
  })


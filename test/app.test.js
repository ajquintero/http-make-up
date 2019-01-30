const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Colors = require('../lib/models/Colors');

describe('Colors', () => {
  let colors = null;

  beforeEach(done => {
    rimraf('./testData/color', err => {
      done(err);
    });
  });

  beforeEach(done => {
    mkdirp('./testData/color', err => {
      done(err);
    });
  });
});
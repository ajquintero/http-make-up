const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../../lib/app');

describe('colors', () => {
  const createColor = (name, hex, rgb) => {
    return request(app)
      .post('/colors')
      .send({ name, hex, rgb })
      .then(res => res.body);
  };

  beforeEach(done => {
    rimraf('./data/tweets', err => {
      done(err);
    });
  });

  beforeEach(done => {
    mkdirp('./data/tweets', err => {
      done(err);
    });
  });

  it('can create a new color', () => {
    return request(app)
      .post('/colors')
      .send({
        name: 'red',
        hex: '#FF0000',
        rgb: 'rgb(255, 0, 0)'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'red',
          hex: '#FF0000',
          rgb: 'rgb(255, 0, 0)',
          __v: 0,
          _id: expect.any(String)
        });
      });
  });

  
});

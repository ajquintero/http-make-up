/* eslint-disable no-unused-vars */
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

describe('colors', () => {
  const createColor = (name, hex, rgb, _id) => {
    return request(app)
      .post('/colors')
      .send({ name, hex, rgb, _id })
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

  it('gets a list of colors', () => {
    return Promise.all(['red', '#FF0000', 'rgb(255, 0, 0)'].map(createColor))
      .then(() => {
        return request(app)
          .get('/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('returns a color by id', () => {
    return createColor('red', '#FF0000', 'rgb(255, 0, 0)')
      .then(color => {
        return Promise.all([
          Promise.resolve(color._id),
          request(app)
            .get(`/colors/${color._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          name: 'red',
          hex: '#FF0000',
          rgb: 'rgb(255, 0, 0)',
          __v: 0,
          _id: expect.any(String)
        });
      });
  });

  it('deletes a color', () => {
    return createColor('red', '#FF0000', 'rgb(255, 0, 0)')
      .then(color => {
        return request(app)
          .delete(`/colors/${color._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});



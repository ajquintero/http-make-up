const colorRoutes = require('./routes/colors');
const { parse } = require('url');
const notFound = require('./routes/colors');
const bodyParser = require('./bodyParser');

const resources = { 
  colorRoutes
};

module.exports = (req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  res.sendWithError = (err, json) => {
    if(err) {
      res.statusCode = 400;
      res.send(err);
    } else { 
      res.send(json);
    }
  };
  res.setHeader('Content-Type', 'application/json');
  const url = parse(req.url, true);
  const parts = url.pathname.slice(1).split('/');

  const resource = parts[0];
  req.id = parts[1];
  
  const route = resources[resource] || notFound;
  
  bodyParser(req)
    .then(body => {
      req.body = body;
      route(req, res);
    });
};

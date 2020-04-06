'use strict';

function routes(app) {

  const devsController = require('./controllers/trendingDevsController');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.route('/trending-devs').get((request, response) => {
    devsController.getTrendingsDevs(request)
    .then(
      (result) => { 
        response.send(result); 
      },
      (reason) => { response.send(reason); },
    )
    .catch((error) => {
      response.send(error.toString());
    });
  });

}

module.exports = routes;
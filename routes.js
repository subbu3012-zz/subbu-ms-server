const routes = require('express').Router();
const bodyParser = require('body-parser');
routes.use(bodyParser.urlencoded({ extended: false }))
routes.use(bodyParser.json())

routes.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let BaseController = require('./controllers/BaseController')

routes.get('/hotspots', BaseController.hotspotMasterController);

routes.get('/tags', BaseController.tagMasterController);

module.exports = routes;
var express = require('express')
  , ensureAuthenticated = require('../ensure-authenticated')
  , makeCrudController = require('../controllers/crud-controller')
  , makePortfolioController = require('../services/portfolio/crud-controller')

module.exports = function(serviceLocator) {

  var admin = express.Router()

  // All admin routes require authentication.
  admin.use(ensureAuthenticated)

  admin.get('/', function(req, res) {
    res.render('admin/index')
  })

  admin.use('/article', makeCrudController(serviceLocator.article))
  admin.use('/portfolio', makePortfolioController(serviceLocator.portfolio))
  admin.use('/portfolio', makeCrudController(serviceLocator.portfolio))

  return admin
}

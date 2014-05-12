var express = require('express')
  , ensureAuthenticated = require('../ensure-authenticated')
  , makeArticleController = require('../ensure-authenticated')

module.exports = function(serviceLocator) {

  var admin = express.Router()

  // All admin routes require authentication.
  admin.use(ensureAuthenticated)

  admin.get('/', function(req, res) {
    res.render('admin/index')
  })

  admin.get('/article', makeArticleController(serviceLocator))

  return admin
}

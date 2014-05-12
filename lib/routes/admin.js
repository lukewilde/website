var express = require('express')
  , admin = express.Router()
  , ensureAuthenticated = require('../ensure-authenticated')

module.exports = function(serviceLocator) {

  // All admin routes require authentication.
  admin.use(ensureAuthenticated)

  admin.get('/', function(req, res) {
    res.render('admin/index')
  })

  // admin.get('/article/new', function(req, res) {

  //   var article =

  //   res.render('admin/form', article)
  // })

  return admin
}

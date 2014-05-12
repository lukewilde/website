var express = require('express')
  , admin = express.Router()
  , ensureAuthenticated = require('../lib/ensure-authenticated')

// All admin routes require authentication.
admin.use(ensureAuthenticated)

admin.get('/', function(req, res) {
  res.render('admin/index')
})

module.exports = admin

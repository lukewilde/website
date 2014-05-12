module.exports = makeRoutes

var indexView = require('./views/index')
  , adminView = require('./views/admin')
  , loginView = require('./views/login')
  , ensureAuthenticated = require('./lib/ensure-authenticated')
  , passport = require('passport')

function makeRoutes(app) {

  app.get('/', function (req, res) {
    indexView(req, res)
  })

  app.get('/admin', ensureAuthenticated, function (req, res) {
    adminView(req, res)
  })

  app.post('/login', passport.authenticate('local',
    { successRedirect: '/admin'
    , failureRedirect: '/login'
    , failureFlash: true
    }
  ))

  app.get('/login', function (req, res) {
    loginView(req, res, { messages: req.flash('error') })
  })

  app.use(function(req, res, next){
    res.render('error/404')
  })
}

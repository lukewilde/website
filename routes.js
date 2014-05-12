module.exports = makeRoutes

var indexView = require('./views/index')
  , adminRouter = require('./routes/admin')
  , loginView = require('./views/login')
  , passport = require('passport')

function makeRoutes(app) {

  app.get('/', function (req, res) {
    indexView(req, res)
  })

  app.post('/login', passport.authenticate('local',
    { successRedirect: '/admin'
    , failureRedirect: '/login'
    , failureFlash: true
    }
  ))

  app.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
  })

  app.use('/admin', adminRouter)

  app.get('/login', function (req, res) {
    loginView(req, res, { messages: req.flash('error') })
  })

  app.use(function(req, res){
    res.render('error/404', { status: 404, url: req.url })
  })

  app.use(function(error, req, res) {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.render('500', {
        status: error.status || 500
      , error: error
    })
  })
}

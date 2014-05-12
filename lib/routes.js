module.exports = makeRoutes

var makeAdminRouter = require('./routes/admin')
  , passport = require('passport')

function makeRoutes(app) {

  app.get('/', function (req, res) {
    res.render('front-end/index', { })
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


  app.use('/admin', makeAdminRouter())

  app.get('/login', function (req, res) {

    var failedAttempt = req.flash('error') >= 1 ? true : false
    console.log(failedAttempt)

    res.render('front-end/login', {failedAttempt: failedAttempt})
  })

  app.use(function(req, res){
    res.render('error/404', { status: 404, url: req.url })
  })

  app.use(function(error, req, res) {
    res.render('500', {
        status: error.status || 500
      , error: error
    })
  })
}

module.exports = makeRoutes

var makeAdminRouter = require('./routes/admin')
  , makeBlogController = require('./controllers/blog-controller')
  , sessionRouter = require('./routes/session')
  , getRssData = require('./rss')

function makeRoutes(app, serviceLocator) {

  app.get('/', function (req, res) {
    res.render('front-end/index', { })
  })

  app.get('/login', sessionRouter.login.get)
  app.post('/login', sessionRouter.login.post)
  app.get('/logout', sessionRouter.logout)

  app.use('/admin', makeAdminRouter(serviceLocator))
  app.use('/blog', makeBlogController(serviceLocator))

  // app.get('/rss', getRssData(serviceLocator.articleService))

  // Error controllers.
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

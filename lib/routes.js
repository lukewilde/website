module.exports = makeRoutes

var makeAdminRouter = require('./routes/admin')
  , makeBlogController = require('./controllers/blog-controller')
  , makePortfolioController = require('./controllers/portfolio-controller')
  , sessionRouter = require('./routes/session')
  , makeRssRouter = require('./routes/rss')

function makeRoutes (app, serviceLocator) {

  app.get('/', function (req, res) {
    res.render('front-end/index', { })
  })

  app.get('/login', sessionRouter.login.get)
  app.post('/login', sessionRouter.login.post)
  app.get('/logout', sessionRouter.logout)

  app.use('/admin', makeAdminRouter(serviceLocator))
  app.use('/blog', makeBlogController(serviceLocator))
  app.use('/portfolio', makePortfolioController(serviceLocator))

  app.get('/rss', makeRssRouter(serviceLocator.article))

  // Error controllers.
  app.use(function (req, res) {
    res.render('error/404', { status: 404, url: req.url })
  })

  app.use(function (error, req, res) {
    res.render('500',
      { status: error.status || 500
      , error: error
    })
  })
}

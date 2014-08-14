module.exports = makeRoutes

var makeAdminRouter = require('./routes/admin')
  , makeBlogController = require('./controllers/blog-controller')
  , makePortfolioController = require('./controllers/portfolio-controller')
  , sessionRouter = require('./routes/session')
  , makeRssRouter = require('./routes/rss')
  , contentDenormaliser = require('./content-denormaliser')
  , liveFilter = require('./util/is-live-filter')

function makeRoutes (app, serviceLocator) {

  app.get('/', function (req, res, next) {

    serviceLocator.article.find(liveFilter, { limit: 6 }, function(error, articles) {
      if (error) return next(error)
      res.render('front-end/index', { articles: contentDenormaliser(articles) })
    })
  })

  app.get('/login', sessionRouter.login.get)
  app.post('/login', sessionRouter.login.post)
  app.get('/logout', sessionRouter.logout)

  app.use('/admin', makeAdminRouter(serviceLocator))
  app.use('/blog', makeBlogController(serviceLocator))
  app.use('/portfolio', makePortfolioController(serviceLocator))

  app.get('/rss', makeRssRouter(serviceLocator.article))

  app.get('/cv', function(req, res) {
    res.redirect('/downloads/luke-wilde-cv.pdf')
  })

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

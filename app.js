var express = require('express')
  , stylus = require('stylus')
  , passport = require('passport')
  , flash = require('connect-flash')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , morgan = require('morgan')
  , path = require('path')
  , compress = require('compression')
  , properties = require('./properties')
  , serviceLocator = require('service-locator')()
  , MongoClient = require('mongodb').MongoClient
  , makeRoutes = require('./lib/routes')
  , configurePassport = require('./lib/configure-passport')
  , makeArticleService = require('./lib/services/article/service')
  , makePortfolioService = require('./lib/services/portfolio/service')
  , port = 3112
  , app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .define('url', stylus.url(
      { paths: [__dirname + '/public']
      }
    )
  )
}

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session(
  { resave: true
  , saveUninitialized: true
  , secret: process.env.SESSION_SECRET || 'dev secret'
  }
))

app.use(flash())
app.use(compress())
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('short'))

app.use(stylus.middleware(
  { src: path.resolve(__dirname + '/public/css/')
  , debug: true
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/templates')
app.set('view engine', 'jade')

app.locals.properties = properties

MongoClient.connect('mongodb://127.0.0.1:27017/lukewilde', function(err, db) {
  if(err) throw err

  configurePassport(db)

  serviceLocator.register('article', makeArticleService(db))
  serviceLocator.register('portfolio', makePortfolioService(db))

  makeRoutes(app, serviceLocator)

  console.log('Server running on http://localhost:' + port)
  app.listen(port)
})

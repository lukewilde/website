var express = require('express')
  , stylus = require('stylus')
  , passport = require('passport')
  , MongoClient = require('mongodb').MongoClient
  , makeRoutes = require('./routes')
  , app = express()
  , port = 3112
  , configurePassport = require('./lib/configure-passport')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .define('url', stylus.url({
      paths : [__dirname + '/public'],
      limit : 10000
    }))
}

app.use(express.cookieParser())
app.use(express.bodyParser())
app.use(express.session({ secret: '....well good open sourced key you got there mate' }))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/views/templates')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public/'
  , compile: compile
  }
))

MongoClient.connect('mongodb://127.0.0.1:27017/lukewilde', function(err, db) {
  if(err) throw err

  configurePassport(db)

  app.use(function(req, res, next) {
      req.db = db
      next()
  })

  makeRoutes(app)

  console.log('Server running on http://localhost:' + port)
  app.listen(port)
})

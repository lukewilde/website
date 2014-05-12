var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express()
  , makeRoutes = require('./routes')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
    .define('url', stylus.url({
      paths : [__dirname + '/public'],
      limit : 10000
    }));
}

app.set('views', __dirname + '/views/templates')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public/'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))

var debug = false



makeRoutes(app, debug)

console.log('Server running on http://localhost:3112')

app.listen(3112)

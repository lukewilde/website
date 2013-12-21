var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express()
  , makeRoutes = require('./routes')
  , buildImageCache = require('./lib/image-cache')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
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

buildImageCache(function (err, imageCache) {

  if (err) {
    return console.error('Image cache load failure', err)
  }

  makeRoutes(app, imageCache, debug)

  console.log('Server running on http://localhost:3111')

  app.listen(3111)
})
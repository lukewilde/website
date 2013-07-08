var gzippo = require('gzippo') // Enable.
  , express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express()
  , indexView = require('./views/index')
  , galleryView = require('./views/gallery')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
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

app.get('/', function (req, res) {
  indexView(req, res)
})

app.get('/gallery', function (req, res) {
  galleryView(req, res)
})

app.get('*', function (req, res) {
  res.render(req.path.substring(1, req.path.length))
})

console.log('Server running on http://localhost:3111')

app.listen(3111)
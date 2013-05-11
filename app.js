var connect = require('connect')
  , gzippo = require('gzippo')
  , express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.static(__dirname + '/public'))
app.use(gzippo.staticGzip(__dirname + '/public'))
app.use(function(req, res, next) {
    res.set('Cache-Control', 'max-age=31536000')
    return next()
  })

app.use(stylus.middleware(
  { src: __dirname + '/public/'
  , compile: compile
  }
))

app.get('*', function (req, res) {
  res.render(req.path.substring(1, req.path.length))
})

app.listen(3111)
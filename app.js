var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express()
  , makeRoutes = require('./routes')

function compile(str, path) {
  console.log('pathpathpathpath', path)
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

makeRoutes(app)

console.log('Server running on http://localhost:3111')

app.listen(3111)
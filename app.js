var connect = require('connect')
  , gzippo = require('gzippo')


var app = connect()
  .use(connect.logger('dev'))
  .use(gzippo.staticGzip(__dirname + '/public'))
  .use(function(req, res, next) {
    res.set('Cache-Control', 'max-age=31536000')
    return next()
  })
 .listen(3111)
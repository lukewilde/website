var connect = require('connect')
  , gzippo = require('gzippo')


var app = connect()
  .use(connect.logger('dev'))
  .use(gzippo.staticGzip(__dirname + '/public'))
 .listen(3111)
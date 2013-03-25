var connect = require('connect')


var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static(__dirname + '/public'))
 .listen(3111)
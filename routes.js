module.exports = makeRoutes

var indexView = require('./views/index')
  , adminView = require('./views/admin')

function makeRoutes(app) {

  app.get('/', function (req, res) {
    indexView(req, res)
  })

  app.get('/admin', function (req, res) {
    adminView(req, res)
  })

  app.use(function(req, res, next){
    res.render('error/404')
  })
}

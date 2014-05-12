module.exports = makeRoutes

var indexView = require('./views/index')

function makeRoutes(app) {

  app.get('/', function (req, res) {
    indexView(req, res)
  })

  app.use(function(req, res, next){
    res.render('404')
  });
}

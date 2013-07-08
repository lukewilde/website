var indexView = require('./views/index')
  , galleryView = require('./views/gallery')

module.exports = makeRoutes

function makeRoutes(app) {

  app.get('/', function (req, res) {
    indexView(req, res)
  })

  app.get('/gallery(/:type)', function (req, res) {
    return galleryView(req, res)
  })

  app.get('/gallerys', function (req, res) {
    return galleryView(req, res)
  })

}
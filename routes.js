var indexView = require('./views/index')
  , galleryView = require('./views/gallery')

module.exports = makeRoutes

function makeRoutes(app) {

  app.get('/', function (req, res) {
    indexView(req, res)
  })

  app.get('/gallery', function (req, res) {
    galleryView(req, res)
  })

}
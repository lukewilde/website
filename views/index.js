var getImage = require('../lib/get-image')()

module.exports = function(req, res) {

  getImage.getRandom('big', function(image) {
    res.render('index', { image: image })
  })
}
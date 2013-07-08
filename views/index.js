var getImage = require('../lib/get-image')()

module.exports = function(req, res) {

  getImage.getRandom('big', function(image) {

    if (err) {
      res.render('500')
    }

    res.render('index', { image: image })
  })
}
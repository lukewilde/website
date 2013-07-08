var getImage = require('../lib/get-image')()

module.exports = function(req, res) {

  getImage.getRandom('small', function(err, image) {

    if (err) {
      res.render('500')
    }

    res.render('index', { image: image })
  })
}
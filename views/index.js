var getImage = require('../lib/get-image')()

module.exports = function(req, res) {

  getImage.getRandom(function(err, image) {

    if (err) {

      console.log('500: ', err)
      res.render('500')
    }

    res.render('index', { image: image })
  })
}
var _ = require('lodash')
  , getImage = require('../lib/get-image')()

module.exports = function(req, res) {

  var noType = typeof req.params.type === 'undefined'
    , typeIsInvalid = (getImage.types.indexOf(req.params.type) < 0)
    , type = req.params.type

  if (noType || typeIsInvalid) {
    type = 'portraits'
  }

  getImage.getCollection(type, 'small', function(err, images) {

    if (err) {
      console.log(err)
      res.render('500')
    }

    res.render('gallery',
       { images: images }
     )
  })
}
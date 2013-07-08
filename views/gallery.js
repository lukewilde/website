var _ = require('lodash')
  , getImage = require('../lib/get-image')()

module.exports = function(req, res) {

  var reqHasNoParams = req.params.length <= 0
    , isInvalidType = !_.has(getImage.types, req.params)
    , type = req.params[0]

  if (reqHasNoParams || isInvalidType) {
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
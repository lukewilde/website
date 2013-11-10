var getImage = require('../lib/get-image')()

module.exports = function(req, res, stock) {

  if (stock) {
    var images = getImage.getStock(15)

    res.render('gallery',
     { images: images }
   )
  }

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
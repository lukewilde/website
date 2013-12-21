var getImage = require('../lib/get-image')()

module.exports = function(req, res, stock) {

  var type = req.params.type
    , typeIsInvalid = (getImage.types.indexOf(type) < 0)

  if (typeIsInvalid) {
    return res.redirect('/gallery/portrait');
  }

  if (stock) {
    return res.render('gallery', { images: getImage.getStock(15), type: type })
  }

  getImage.getCollection(type, function(err, images) {

    if (err) {
      console.log(err)
      res.render('500')
    }

    res.render('gallery', { images: images, type: type })
  })
}
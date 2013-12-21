var _ = require('lodash')

module.exports = function(req, res, imageCache, stock) {

  var image = req.params.image

  if (stock) {
    image = 'http://placeholder.clockhosting.com/' + image
    res.render('gallery-item', { image: image })
    return
  }

  image = _.find(imageCache[req.params.type], { name: image })

  if (image) {
    res.render('gallery-item', { image: image, imageCache: imageCache })
  } else {
    res.render('404')
  }
}
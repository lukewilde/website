var _ = require('lodash')

module.exports = function(req, res, imageCache, stock) {

  var image = req.params.image

  if (stock) {
    image = 'http://placeholder.clockhosting.com/' + image
    res.render('gallery-item', { image: image })
    return
  }

  var imageByType = imageCache[req.params.type]
    , imageIndex = _.findIndex(imageByType, { name: image })
    , next = imageByType[imageIndex +1]
    , image = imageByType[imageIndex]
    , prev = imageByType[imageIndex -1]

  next = next ? next : false
  prev = prev ? prev : false

  if (image) {
    res.render('gallery-item',
      { image: image
      , next: next
      , prev: prev
      }
    )
  } else {
    res.render('404')
  }
}
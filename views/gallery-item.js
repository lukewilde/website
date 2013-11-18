module.exports = function(req, res, stock) {

  var image = req.params.image

  if (stock) {
    image = 'http://placeholder.clockhosting.com/' + image
  }

  res.render('gallery-item', { image: image })
}
var portraitImages = require('./images/portrait')

module.exports = function(req,res) {

  var image = portraitImages[ Math.floor(Math.random() * portraitImages.length) ]
  res.render('index', { image: image })
}
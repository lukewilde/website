var fs = require('fs')
  , types = ['lifestyle', 'portraits', 'travel']

module.exports = function () {

  function getCollection(type, size, cb) {
    fs.readdir('./public/images/' + type + '/' + size, function(err, files) {
      cb(err, files)
    })
  }

  function getRandom(size, cb) {
    var randomType = types[ Math.floor(Math.random() * types.length) ]

    getCollection(randomType, size, function (collection) {
      var randomImage = collection[ Math.floor(Math.random() * collection.length) ]
      console.log(randomImage)
      cb(randomImage)
    })

  }

  var getImage =
    { getCollection: getCollection
    , getRandom: getRandom
    }

  return getImage
}
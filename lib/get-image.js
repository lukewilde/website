var fs = require('fs')
  , _ = require('lodash')

module.exports = function () {

  var types = ['lifestyle', 'portraits', 'travel']

  function getCollection(type, size, cb) {
    fs.readdir('./public/images/' + type + '/' + size, function(err, files) {

      var images = _.map(files, function(file) {

        var image =
            { name: file
            , src: ['/images', type, size, file].join('/')
            , big: ['/images', type, 'big', file].join('/')
            , small: ['/images', type, 'small', file].join('/')
            }

        return image
      })

      cb(err, images)
    })
  }

  function getRandom(size, cb) {
    var randomType = types[ Math.floor(Math.random() * types.length) ]

    getCollection(randomType, size, function (err, collection) {

      if (err) cb(err)

      var randomImage = collection[ Math.floor(Math.random() * collection.length) ]
      console.log(null, randomImage)
      cb(null, randomImage)
    })

  }

  var getImage =
    { getCollection: getCollection
    , getRandom: getRandom
    , types: types
    }

  return getImage
}
var getImage = require('../lib/get-image')()
  , async = require('async')

module.exports = function (callback) {

  async.parallel(
    { lifestyle: function (callback) {
        getImage.getCollection('lifestyle', callback)
      }
    , portrait: function (callback) {
        getImage.getCollection('portrait', callback)
      }
    , travel: function (callback) {
        getImage.getCollection('travel', callback)
      }
    }
  , callback
  )
}
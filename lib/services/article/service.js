var CrudService = require('crud-service')
  , save = require('save')
  , saveMongodb = require('save-mongodb')
  , createSchema = require('./schema')

module.exports = function(db) {
  var saveOptions = { engine: saveMongodb(db.collection('article'))}
    , articleService = new CrudService('articles', save('article', saveOptions), createSchema(db))

  articleService.getLiveFilter = function() {
    var filter =
      { isVisible: true
      , published: { $lte: new Date() }
      }

    return filter
  }

  return articleService
}

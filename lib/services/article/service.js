var CrudService = require('crud-service')
  , save = require('save')
  , saveMongodb = require('save-mongodb')
  , schema = require('./schema')

module.exports = function(db) {
  return new CrudService('articles', save('article', { engine: saveMongodb(db.collection('article'))}), schema)
}

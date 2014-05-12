var CrudService = require('crud-service')
  , save = require('save')
  , schema = require('./schema')
  , articleService = new CrudService('things', save('thing'), schema())

module.exports = articleService

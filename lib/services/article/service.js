var CrudService = require('crud-service')
  , save = require('save')
  , schema = require('./schema')
  , articleService = new CrudService('articles', save('article'), schema())

module.exports = articleService

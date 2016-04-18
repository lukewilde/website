var express = require('express')
  , contentDenormaliser = require('../../content-denormaliser')
  , async = require('async')

module.exports = function(portfolioService) {
  var portfolioCrudController = express.Router()

  portfolioCrudController.get('/', function(req, res, next) {

    async.parallel(
      { games: function(callback) {
          portfolioService.find({ type: 'game' }, callback)
        }
      , sites: function(callback) {
          portfolioService.find({ type: 'website' }, callback)
        }
      }
    , function(error, result) {

      if (error) return next(error)


      var templateName = 'admin/' + portfolioService.name + '/list'
      var types =
        { games: { title: 'Games', items: contentDenormaliser(result.games) }
        , sites: { title: 'Websites', items:  contentDenormaliser(result.sites) }
        }

      res.render(templateName, { types: types })
    })
  });


  return portfolioCrudController
}

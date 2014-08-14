var express = require('express')
  , contentDenormaliser = require('../content-denormaliser')
  , _ = require('lodash')
  , url = require('url')
  , liveFilter = require('../util/is-live-filter')

module.exports = function(serviceLocator) {

  var portfolioRouter = express.Router()
    , portfolioService = serviceLocator.portfolio

  portfolioRouter.get('/', function(req, res, next) {
    portfolioService.find(liveFilter, function(error, items) {
      if (error) return next(error)
      res.render('front-end/portfolio/index', { items: contentDenormaliser(items) })
    })
  })

  portfolioRouter.get('/:slug', function(req, res, next) {

    var query = { slug: req.params.slug }
        , parts = url.parse(req.url, true)

    if (typeof parts.query.preview === 'undefined') {
      query = _.extend({}, liveFilter, query)
    }

    portfolioService.find(query, function(error, items) {
      if (error) return next(error)
      if (items.length < 1) {
        return next()
      }
      res.render('front-end/portfolio/view', { item: contentDenormaliser(items.shift()) })
    })
  })

  return portfolioRouter
}

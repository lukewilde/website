var express = require('express')
  , articleDenormaliser = require('../article-denormaliser')
  , _ = require('lodash')

module.exports = function(serviceLocator) {

  var blogRouter = express.Router()
    , articleService = serviceLocator.article
    , liveFilter = articleService.getLiveFilter()

  blogRouter.get('/', function(req, res, next) {
    articleService.find(liveFilter, function(error, articles) {
      if (error) return next(error)
      res.render('front-end/blog/index', { articles: articleDenormaliser(articles) })
    })
  })

  blogRouter.get('/:slug', function(req, res, next) {

    var query = _.extend(liveFilter, { slug: req.params.slug })

    articleService.find(query, function(error, articles) {
      if (error) return next(error)
      if (articles.length < 1) {
        return next()
      }
      res.render('front-end/blog/view', { article: articleDenormaliser(articles.shift()) })
    })
  })

  return blogRouter
}

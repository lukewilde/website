var express = require('express')

module.exports = function(serviceLocator) {

  var blogRouter = express.Router()
    , articleService = serviceLocator.article

  blogRouter.get('/', function(req, res, next) {
    articleService.find({}, function(error, articles) {
      if (error) return next(error)
      res.render('front-end/blog/index', { articles: articles })
    })
  })

  blogRouter.get('/:slug', function(req, res, next) {
    articleService.find({slug: req.params.slug}, function(error, articles) {
      if (error) return next(error)
      if (articles.length < 1) {
        return next()
      }
      res.render('front-end/blog/view', { article: articles.shift() })
    })
  })

  return blogRouter
}

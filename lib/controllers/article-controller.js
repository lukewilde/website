var express = require('express')

module.exports = function(serviceLocator) {

  var articleRouter = express.Router()
    , articleService = serviceLocator.articleService

  articleRouter.get('/', function(req, res) {
    res.render('articles/list', { articles: articleService.find() })
  })

  articleRouter.get('/new', function(req, res) {
    res.render('articles/form', { article: articleService.schema.makeDefault() })
  })

  articleRouter.get('/edit/:slug', function(req, res, next) {

    articleService.find({slug: req.params.slug}, function(error, articles) {
      if (error) return next(error)

      if (articles.length < 1) {
        return next()
      }

      res.render('articles/form', { article: articles.shift() })
    })

  })
}

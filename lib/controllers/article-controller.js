var express = require('express')
  , articleDenormaliser = require('../article-denormaliser')

module.exports = function(serviceLocator) {

  var articleRouter = express.Router()
    , articleService = serviceLocator.article

  articleRouter.use(function(req, res, next) {
    if (req.body.cancel) return res.redirect('/admin/article')

    next()
  })

  articleRouter.get('/', function(req, res, next) {
    articleService.find({}, function(error, articles) {
      if (error) return next(error)
      res.render('admin/article/list', { articles: articleDenormaliser(articles) })
    })
  })

  articleRouter.get('/new', function(req, res) {
    res.render('admin/article/form', { article: articleService.schema.makeDefault() })
  })

  articleRouter.post('/new', function(req, res) {
    articleService.create(req.body, function(error, article) {
      if (error) {
        console.log(error)
        return res.render('admin/article/form', { article: article, errors: error.errors })
      }
      res.redirect('/admin/article')
    })
  })

  articleRouter.get('/edit/:slug', function(req, res, next) {
    articleService.find({slug: req.params.slug}, function(error, articles) {
      if (error) return next(error)
      if (articles.length < 1) {
        return next()
      }
      res.render('admin/article/form', { article: articles.shift() })
    })
  })

  articleRouter.get('/delete/:id', function(req, res, next) {
    articleService.delete(req.params.id, function(error) {
      if (error) return next(error)
      res.redirect('/admin/article')
    })
  })

  articleRouter.post('/edit/:slug', function(req, res) {
    articleService.update(req.body, {}, function(error, article) {
      if (error) {
        return res.render('admin/article/form', { article: article, errors: error.errors })
      }
      res.redirect('/admin/article')
    })
  })

  return articleRouter
}

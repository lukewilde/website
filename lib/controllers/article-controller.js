var express = require('express')

module.exports = function(serviceLocator) {

  var articleRouter = express.Router()
    , articleService = serviceLocator.article

  articleRouter.get('/', function(req, res, next) {
    articleService.find({}, function(error, articles) {
      if (error) return next(error)
      res.render('admin/article/list', { articles: articles })
    })
  })

  articleRouter.get('/new', function(req, res) {
    res.render('admin/article/form', { article: articleService.schema.makeDefault() })
  })

  articleRouter.post('/new', function(req, res) {
    articleService.create(req.body, function(error, article) {
      if (error) {
        console.log(error)
        return res.render('admin/article/form', { article: article })
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

  articleRouter.post('/edit/:slug', function(req, res, next) {
    articleService.update(req.body, {}, function(error, article) {
      if (error) {
        console.log(error)
        return res.render('admin/article/form', { article: article })
      }
      res.redirect('/admin/article')
    })
  })

  return articleRouter
}

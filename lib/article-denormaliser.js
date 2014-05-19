var moment = require('moment')
  , _ = require('lodash')
  , marked = require('marked')
  , highlight = require('highlight.js')
  , properties = require('../properties')

module.exports = function(articles) {

  // Synchronous highlighting with highlight.js
  marked.setOptions(
    { highlight: function (code) {
        return highlight.highlightAuto(code).value
      }
    }
  )

  function denormaliseArticle(article) {
    article.published = moment(article.published).format('MMMM Do YYYY')
    article.created = moment(article.created).format('MMMM Do YYYY')
    article.body = marked(article.body)
    article.fullUrl = properties.siteUrl + '/blog' + article.slug

    return article
  }

  if (_.isArray(articles)) {
    return _.map(articles, denormaliseArticle)
  } else {
    return denormaliseArticle(articles)
  }
}


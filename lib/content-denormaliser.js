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

  function isLive (article) {

    if (!article.isVisible) {
      return false
    }

    var now = new Date()
    // console.log(article.published, now)
    return article.published <= now
  }

  function denormaliseArticle(article) {

    article.isLive = isLive(article)

    article.created = moment(article.created).format('MMMM Do YYYY')
    article.published =
      { long: moment(article.published).format('MMMM Do YYYY')
      , short:
        { month: moment(article.published).format('DD/MMM')
        , year: moment(article.published).format('YYYY')
        }
      }

    article.body = marked(article.body)
    article.url = '/blog/' + article.slug
    article.fullUrl = properties.siteUrl + article.url

    return article
  }

  if (_.isArray(articles)) {
    return _.map(articles, denormaliseArticle)
  } else {
    return denormaliseArticle(articles)
  }
}

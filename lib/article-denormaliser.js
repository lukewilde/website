var moment = require('moment')
  , _ = require('lodash')

module.exports = function(articles) {

  function denormaliseArticle(article) {
    article.published = moment(article.published).format('MMMM Do YYYY')

    return article
  }

  if (_.isArray(articles)) {
    return _.map(articles, denormaliseArticle)
  } else {
    return denormaliseArticle(articles)
  }
}


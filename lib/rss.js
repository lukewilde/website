var Rss = require('rss')
  , properties = require('../properties')

module.exports = function(articleService) {
  var options =
      { title: properties.title
      , description: properties.description
      , site_url: properties.siteUrl
      , feed_url: properties.siteUrl + '/rss'
      , image_url: properties.siteUrl + '/icon.png'
      , author: 'Luke Wilde'
      , copyright: '2014 Luke Wilde'
      , language: 'en'
      , ttl: '60'
      }
    , rss = new Rss(options)

}

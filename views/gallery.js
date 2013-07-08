var lifestyleImages = require('./images/lifestyle')
  , portraitImages = require('./images/portrait')

module.exports = function(req, res) {
  res.render('gallery',
     { sections:
       [ { name: 'portrait'
         , images: portraitImages
         }
       , { name: 'lifestyle'
         , images: lifestyleImages
         }
       ]
     }
   )
}
var connect = require('connect')
  , gzippo = require('gzippo')
  , express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views/templates')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public/'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))

app.get('/gallery', function (req, res) {

  res.render('gallery',
    { sections:
      [ { name: 'portrait'
        , images:
          [ { name: 'Test'
            , slug: 'test1'
            , src: 'test.jpg'
            }
          , { name: 'Long Test'
            , slug: 'test2'
            , src: 'long-test.png'
            }
          , { name: 'Long Test'
            , slug: 'test3'
            , src: 'long-test.png'
            }
          , { name: 'Test'
            , slug: 'test4'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test5'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test6'
            , src: 'test.jpg'
            }
          , { name: 'Long Test'
            , slug: 'test7'
            , src: 'long-test.png'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          ]
        }
      , { name: 'lifestyle'
        , images:
          [ { name: 'Test'
            , slug: 'test1'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test4'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test5'
            , src: 'test.jpg'
            }
          , { name: 'Long Test'
            , slug: 'test2'
            , src: 'long-test.png'
            }
          , { name: 'Long Test'
            , slug: 'test3'
            , src: 'long-test.png'
            }
          , { name: 'Test'
            , slug: 'test6'
            , src: 'test.jpg'
            }
          , { name: 'Long Test'
            , slug: 'test7'
            , src: 'long-test.png'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          , { name: 'Test'
            , slug: 'test8'
            , src: 'test.jpg'
            }
          ]
        }
      ]
    }
  )
})

app.get('*', function (req, res) {
  res.render(req.path.substring(1, req.path.length))
})

console.log('Server running on http://localhost:3111')

app.listen(3111)
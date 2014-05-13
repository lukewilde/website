var schemata = require('schemata')

module.exports = schemata(
  { headline:
    { name: 'Title'
    }
  , subtitle:
    { name: 'Sub Title'
    }
  , slug:
    { name: 'Slug'
    }
  , description:
    { name: 'Description'
    }
  , body:
    { name: 'Body'
    }

  // Meta data
  , published:
    { name: 'Date Published'
    , type: Date
    , defaultValue: new Date().toISOString()
    }
  , created:
    { name: 'Date Created'
    , type: Date
    , defaultValue: new Date().toISOString()
    }
  , isVisible:
    { type: Boolean
    , defaultValue: false
    }
  , _id: {}
  }
)

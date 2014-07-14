var createSequence = require('./logistic-random')
  , json2csv = require('json2csv')
  , fs = require('fs')
  , logRandom1 = createSequence(1)
  , logRandom2 = createSequence(10000001)
  , data = []


for (var i = 0; i < 200; i++) {
  data.push(
    { 'a': logRandom1.get()
    , 'b': logRandom2.get()
    }
  )
}

// console.log(data)

json2csv({ data: data, fields: ['a', 'b'] }, function(err, csv) {

  if (err) console.log(err)

  fs.writeFile('data.csv', csv, function(err) {
    if (err) throw err
    console.log('file saved')
  })

})

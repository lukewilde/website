module.exports =  function() {
  var filter =
    { isVisible: true
    , published: { $lte: new Date() }
    }

  return filter
}

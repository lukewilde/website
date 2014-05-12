module.exports = function(req, res, options) {

  options.failedAttempt = options.messages.length >= 1 ? true : false

  console.log(options.failedAttempt)

  res.render('front-end/login', options)
}

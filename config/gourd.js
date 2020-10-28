const ensureAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
      }
    req.flash(
      'error',
      'You are not logged In.'
    )
    res.redirect('/user/login')
}

const forwordAuthentication = (req, res, next) => {
  if(!req.isAuthenticated()){
    return next()
  }
  else{
    req.flash(
      'error',
      'You are already logged In.'
    )
    res.redirect('/home')
  }
}

module.exports.ensureAuthentication = ensureAuthentication
module.exports.forwordAuthentication = forwordAuthentication
var express = require('express');
var router = express.Router();
var users = require('./users');
const passport = require('passport');
var localStrategy = require('passport-local');
passport.use(new localStrategy(users.authenticate));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('/register');
});

router.get('/kakk', function(req, res, next) {
  res.render('kakk');
});

router.post('/register', function(req, res, next){
  var newUser = {
    username: req.body.username,
  };
  users.register(newUser, req.body.password)
    .then(() => {
      // Use passport.authenticate as middleware to log in the user immediately after registration
      passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/'
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login'); // redirect to the login page after logout
});

module.exports = router;

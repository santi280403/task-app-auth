const { Router } = require('express');
const passport = require('passport');
const router = Router();

const { isLoggedIn, isNotLoggedIn } = require('../controllers/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('forms/regestrer.hbs')
})

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/tasks',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/signin', (req, res) => {
    res.render('forms/login.hbs')
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/tasks',
        failureRedirect: '/signin',
        failureFlash: true
    }) (req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;
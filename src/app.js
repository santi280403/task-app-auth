const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const mysql_session = require('express-mysql-session');
const flash = require('connect-flash');
const exhbs = require('express-handlebars');
const path = require('path');

const { database } = require('./keys');

//initializations
const app = express();
require('./database');
require('./controllers/user.controller');

//settings
app.set('port', process.env.PORT || 4100);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//midlewares
app.use(session({
    secret: 'mysqlsession',
    resave: false,
    saveUninitialized: false,
    store: new mysql_session(database)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());

//global variables
app.use((req, res, next) => {
    app.locals.danger = req.flash('danger');
    app.locals.success = req.flash('success');
    app.locals.users = req.user;
    next();
});

//routes
app.use(require('./routes/authenticate.routes'));
app.use(require('./routes/tasks.routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
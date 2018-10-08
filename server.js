/* 
 * nodejs backend entry point
 */


/* Connect all required services */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cookieSession = require('cookie-session');
const mongo = require('mongodb');
const db = require('./server/config/database');
const MongoStore = require('connect-mongo')(expressSession);
expressSession(app, mongo.initSessionStore);
// Config
global.appRoot = path.resolve(__dirname);
require('dotenv').config();

// Configuring Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Account = require('./server/models/account.model');

const routes = require('./routes');

/*--------------------------------------------------------------*/
//
// Parsers
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(expressSession({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session({ cookie: { maxAge : 86400000 }}));

passport.use(new LocalStrategy(	Account.authenticate()	));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

/*--------------------------------------------------------------*/
//
// Routes
app.use('/account', routes.accountRoute);
app.use('/api/item', routes.itemRoute);

//app.disable('etag');

/*--------------------------------------------------------------*/
//
// Server
//Set Port
const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));


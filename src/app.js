// IMPORTACIONES

import express from 'express';
import passport from 'passport';
import __dirname from './utils.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import MVCRouter from './routes/mvc.router.js'; 
import indexRouter from './routes/index.router.js';
import inicializePassport from './middlewares/passport.js';
import 'dotenv/config.js';
import './config/database.js';

// SERVIDOR

const app = express ();
app.listen(process.env.PORT, () => {
console.log('Server ready')});

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded ({extended: true}));
app.use(express.static((`${__dirname}/public`)));
app.use(cookieParser(process.env.SECRETCOOKIE));
app.use(expressSession({
    store: MongoStore.create({
        mongoUrl:process.env.DBURI,
        ttl: 60*60*24*7
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}));

// PASSPORT 

inicializePassport();
app.use(passport.initialize());
app.use(passport.session());

// HANDLEBARS

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// ENDPOINT PRINCIPAL

app.use('/api', indexRouter);

// ENDPOINT PRINCIPAL MVC

const router = new MVCRouter(); 
app.use('/mvc', router.getRouter()); 
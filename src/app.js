// IMPORTACIONES

import express from 'express';
import __dirname from './utils.js';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import indexRouter from './routes/index.router.js'
import 'dotenv/config.js'
import './config/database.js';

// SERVIDOR

const app = express ();
app.listen(process.env.PORT, () => {
console.log('Server ready')});

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded ({extended: true}));
app.use(express.static((`${__dirname}/public`)));
app.use(expressSession({
    store: MongoStore.create({
        mongoUrl:process.env.DBURI,
        ttl: 60*60*24*7
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}));

// HANDLEBARS

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// ENDPOINT PRINCIPAL

app.use('/api', indexRouter);
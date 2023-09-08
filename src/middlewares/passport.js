import passport from 'passport';
import User from '../models/user.js';
import { Strategy } from 'passport-local';
import GHStrategy from 'passport-github2';


export default function() {
// CONFIGURACION DE PASSPORT (SERIALIZACION)
    passport.serializeUser((user, done) => {return done (null, user._id)});
// CONFIGURACION DE PASSPORT (DESERIALIZACION)
    passport.deserializeUser(async(id, done) => {
            const user = await User.findById(id)
            return done(null, user)
        }
    );
// ESTRATEGIA DE REGISTRO
    passport.use('register', new Strategy({passReqToCallback:true, usernameField: 'mail'},
        async(req, username, password, done) => {
            try {
                let one = await User.findOne({ mail : username })
                if(!one) {
                    let user = await User.create(req.body)
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    ));
// ESTRATEGIA DE INICIO DE SESION
    passport.use('login', new Strategy({usernameField: 'mail'},
        async(username, password, done) => {
            try {
                let one = await User.findOne({ mail : username })
                if (!one) {
                    return done(null, false)
                } else {
                    return done(null, one)
                }
            } catch (error) {
                return done(error)
            }
        }
    ));
// ESTRATEGIA INICIO DE SESION CON GITHUB
    passport.use('github', new GHStrategy({clientID: process.env.GHCLIENTID, clientSecret: process.env.GHSECRETKEY, callbackURL: process.env.GHCALLBACK},
        async(accesToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ mail : profile._json.login })
                if (user) {
                    return done(null, user)
                } else {
                    let one = await User.create({
                        name: profile.username,
                        photo: profile._json.avatar_url,
                        mail: profile._json.login,
                        password: profile._json.id
                    })
                    return done(null, one)
                }            
            } catch (error) {
                return done(error)
            }
        })
    );
};
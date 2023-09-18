import { Router } from 'express';
import passport from 'passport';
import authManager from '../../controllers/AuthManager.js';
import is_form_ok from '../../middlewares/is_form_ok.js'
import is_8_char from '../../middlewares/is_8_char.js';
import is_valid_user from '../../middlewares/is_valid_user.js';
import create_hash from '../../middlewares/create_hash.js';
import is_valid_password from '../../middlewares/is_valid_password.js';
import create_token from '../../middlewares/create_token.js';

const authRouter = Router ();

// RENDERIZADO DE VISTA, FORMULARIO DE INICIO ( http://localhost:8080/api/auth/signin/ )
authRouter.get('/signin', authManager.signIn);
// RENDERIZADO DE VISTA, FORMULARIO DE REGISTRO ( http://localhost:8080/api/auth/register/ )
authRouter.get('/register', authManager.newUser);
// REGISTRO DE UN NUEVO USUARIO ( http://localhost:8080/api/auth/register/ )
authRouter.post('/register', is_form_ok, is_8_char, create_hash, authManager.registerUser);
// INICIO DE SESION ( http://localhost:8080/api/auth/login/ )
authRouter.post('/login', is_8_char, is_valid_user, is_valid_password, authManager.logIn);
// CIERRE DE SESION ( http://localhost:8080/api/auth/logout/ )
authRouter.post('/logout', passport.authenticate('jwt'), authManager.logOut);
// IMPLEMENTACION DE PASSPORT EN EL REGISTRO ( http://localhost:8080/api/auth/passport/register/ )
authRouter.post('/passport/register', is_form_ok, is_8_char, create_hash, passport.authenticate('register'), authManager.signUp);
// IMPLEMENTACION DE PASSPORT EN EL LOGIN ( http://localhost:8080/api/auth/passport/login/ )
authRouter.post('/passport/login', is_8_char, passport.authenticate('login'), is_valid_password, create_token, authManager.logOn);
// INICIO DE SESION CON GITHUB ( http://localhost:8080/api/auth/github/ )
authRouter.get('/github', passport.authenticate('github', { scope: ['user:mail'] }), (req, res) => {});
authRouter.get('/github/callback', passport.authenticate('github', {}), authManager.callback);

export default authRouter;
import { Router } from 'express';
import authManager from '../../controllers/AuthManager.js';
import is_form_ok from '../../middlewares/is_form_ok.js'
import is_8_char from '../../middlewares/is_8_char.js';
import is_valid_user from '../../middlewares/is_valid_user.js';

const authRouter = Router ();

// RENDERIZADO DE VISTA, FORMULARIO DE INICIO ( http://localhost:8080/api/auth/signin/ )
authRouter.get('/signin', authManager.signIn);
// RENDERIZADO DE VISTA, FORMULARIO DE REGISTRO ( http://localhost:8080/api/auth/register/ )
authRouter.get('/register', authManager.newUser);
// REGISTRO DE UN NUEVO USUARIO ( http://localhost:8080/api/auth/register/ )
authRouter.post('/register', is_form_ok, is_8_char, authManager.registerUser);
// INICIO DE SESION ( http://localhost:8080/api/auth/login/ )
authRouter.post('/login', is_8_char, is_valid_user, authManager.logIn);
// CIERRE DE SESION ( http://localhost:8080/api/auth/logout/ )
authRouter.post('/logout', authManager.logOut);

export default authRouter;
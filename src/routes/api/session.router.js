import { Router } from 'express';

const sessionRouter = Router();

// DEVUELVE EN UNA RESPUESTA EL USUARIO ACTUAL ( http://localhost:8080/api/session/current/ )
sessionRouter.get('/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Usuario no autenticado' });
  }
});

export default sessionRouter;
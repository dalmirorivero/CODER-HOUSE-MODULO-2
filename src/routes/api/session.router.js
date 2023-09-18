import { Router } from 'express';

const sessionRouter = Router ();

sessionRouter.get('/current', (req, res) => {
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, puedes devolver la información del usuario
      res.status(200).json({ user: req.user });
    } else {
      // Si el usuario no está autenticado, puedes devolver un error o un objeto vacío
      res.status(401).json({ message: 'Usuario no autenticado' });
    }
  });

export default sessionRouter;
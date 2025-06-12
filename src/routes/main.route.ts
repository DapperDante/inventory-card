import { Router } from 'express';

const mainRoutes = Router();

mainRoutes.get('/', (req, res) => {
  res.send('Welcome to the main route!');
});

export default mainRoutes;
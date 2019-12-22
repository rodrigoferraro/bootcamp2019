import { Router } from 'express';
import User from './app/models/User'

const routes = new Router();

routes.get('/', async(req, res) => {
  const user = await User.create({
    name: 'Rodrigo Ferraro',
    email: 'email@dominio.com',
    password_hash: '123412343214',
  })
  return res.json({ message: 'hi there' });
});

export default routes;

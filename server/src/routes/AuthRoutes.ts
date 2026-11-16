import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import RegisterController from '../controllers/RegisterController';

const authRoutes = Router();

authRoutes.post('/login', LoginController);
authRoutes.post('/register', RegisterController);

export default authRoutes;
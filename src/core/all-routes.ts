import { Application } from 'express';
import authRoutes from './auth/auth.routes';
import userRoutes from './user/user.routes';

const initRoutes = (app: Application) => {
	authRoutes(app);
	userRoutes(app);
};

export default initRoutes;

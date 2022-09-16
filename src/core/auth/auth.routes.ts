import { Application } from 'express';
import AuthController from './auth.controller';
import ValidationMiddleware from '../../middlewares/validation.middleware';
import { Login } from './auth.dto';

const authRoutes = (app: Application) => {
	const authController=new AuthController();
	app.route('/auth/login').post(ValidationMiddleware(Login), authController.login);
};

export default authRoutes;

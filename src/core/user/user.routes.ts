import { Application } from 'express';
import ValidationMiddleware from '../../middlewares/validation.middleware';
import { User } from './user.dto';
import UserController from './user.controller';

const userRoutes = (app: Application) => {
	const userController=new UserController();
	app.route('/user/create').post(ValidationMiddleware(User), userController.create);
	app.route('/user/update/:id').put(ValidationMiddleware(User), userController.update);
	app.route('/user/delete/:id').delete(userController.delete);
	app.route('/user/list').get(userController.findAll);
	app.route('/user/:id').get(userController.findOne);
};

export default userRoutes;

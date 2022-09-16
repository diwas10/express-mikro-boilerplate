import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { match } from 'node-match-path';
import HttpException from '../utils/exceptions/http.exception';
import * as httpContext from 'express-http-context';
import UnprotectedRoutes from '../config/auth/unprotected-routes';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';

const authenticate = ({ req, res, next, callback }) => {
	passport.authenticate('jwt', { session: false }, (error, user, info) => {
		try {
			callback(error, user, info);
			next();
		} catch (err) {
			next(err);
		}
	})(req, res, next);
};

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

	const isUnProtected = UnprotectedRoutes.find(unprotectedRoute => {
		const { matches } = match(unprotectedRoute, req.path);
		return matches;
	});

	if (isUnProtected) return next();

	authenticate({
		req, res, next, callback(error, user, info) {
			if (error || !user) throw new HttpException(401, 'Unauthorized');
			const userInfo = (({ id, username }) => ({ id, username }))(user);
			httpContext.set('user', userInfo);
		},
	});
};

const SocketAuthMiddleware = (req: { headers: { Authorization: string } }, next: (err?: ExtendedError) => void) => {
	authenticate({
		req, res: {}, next, callback(error, user, info) {
			if (!user || error) throw new Error(info.message);
		},
	});
};

export { SocketAuthMiddleware };
export default AuthMiddleware;

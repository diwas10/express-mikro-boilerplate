import { NextFunction, Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import BadRequestException from '../utils/exceptions/bad-request.exception';

const ValidationMiddleware = (Schema: Class) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const schema = new Schema();
		Object.entries(req.body).forEach(key => {
			schema[key[0]] = key[1];
		});
		try {
			await validateOrReject(schema);
			next();
		} catch (err) {
			throw new BadRequestException(err, 'Invalid Request Data sent in Body');
		}
	};
};
export default ValidationMiddleware;

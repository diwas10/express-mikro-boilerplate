import HttpException from './http.exception';

class BadRequestException extends HttpException {
	error: any;

	constructor(error: any, message = '') {
		super(422, message);
		this.error = error;
	}
}

export default BadRequestException;

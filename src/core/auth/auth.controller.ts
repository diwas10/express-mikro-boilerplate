import AuthService from './auth.service';
import { SuccessRes } from '@utils/response';
import { Login } from './auth.dto';
import { Singleton } from '@utils/decorators/singleton';

@Singleton
class AuthController {

	private authService:AuthService;

	constructor() {
		this.authService=new AuthService()
	}

	login = async (req: Request<Login>, res: Response) => {
		return SuccessRes(res, 200, {
			data: await this.authService.login(req.body),
			message: `User Logged in Successfully`,
		});
	};
}

export default AuthController;

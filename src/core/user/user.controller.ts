import { SuccessRes } from '@utils/response';
import { User } from './user.dto';
import UserService from './user.service';
import { Singleton } from '@utils/decorators/singleton';

@Singleton
class UserController {
	private readonly userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	create = async (req: Request<User>, res: Response) => {
		return SuccessRes(res, 200, {
			data: await this.userService.create(req.body),
			message: `User Created in Successfully`,
		});
	};

	update = async (req: Request<User, { id: string }>, res: Response) => {
		return SuccessRes(res, 200, {
			data: await this.userService.update(req.params.id, req.body),
			message: `User Updated in Successfully`,
		});
	};

	delete = async (req: Request<null, { id: string }>, res: Response) => {
		return SuccessRes(res, 200, {
			data: await this.userService.delete(req.params.id),
			message: `User Deleted in Successfully`,
		});
	};

	findOne = async (req: Request<null, { id: string }>, res: Response) => {
		return SuccessRes(res, 200, {
			data: await this.userService.findOne(req.params.id),
			message: `User Fetched in Successfully`,
		});
	};

	findAll = async (req: Request, res: Response) => {
		return SuccessRes(res, 200, {
			data: await this.userService.findAll(),
			message: `User List Fetched in Successfully`,
		});
	};
}

export default UserController;

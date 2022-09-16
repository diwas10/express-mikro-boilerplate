import { Login } from './auth.dto';
import UserRepository from '@core/user/user.repository';
import { Mikro } from '../../app';
import { User } from '@core/user/user.entity';
import HttpException from '@utils/exceptions/http.exception';
import { compareHash } from '@utils/bcrypt';
import { signToken } from '@utils/token';
import { Singleton } from '@utils/decorators/singleton';

@Singleton
class AuthService {
		private userRepository:UserRepository;

		constructor() {
			this.userRepository=Mikro.em.getRepository(User);
		}

	login = async ({ password, email }: Login) => {
		const user=await this.userRepository.findOne({ email } as any);

		if(!user) throw new HttpException(404, "User Not Found!");
		if(!(await compareHash(password, user.password))) throw new HttpException(404, "User Not Found!")

		const token =signToken({ email: user.email, id: user.id, name: user.name, phoneNumber: user.phoneNumber })

		return {user, token}
	};
}

export default  AuthService;

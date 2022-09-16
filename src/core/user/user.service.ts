import { User } from './user.dto';
import HttpException from '@utils/exceptions/http.exception';
import { hashPassword } from '@utils/bcrypt';
import UserRepository from './user.repository';
import { Singleton } from '@utils/decorators/singleton';
import { User as UserEntity } from './user.entity';
import { Mikro } from '../../app';
import { getContextUser } from '@utils/utility';
import { wrap } from '@mikro-orm/core';

@Singleton
class UserService {
	private readonly userRepository:UserRepository;
	private readonly user:User;

	constructor() {
		this.userRepository=Mikro.em.getRepository(UserEntity);
		this.user=getContextUser();
	}
	
	private findUserOrFail=async (id:string)=>{
		const user = await this.userRepository.findOne({ id } as any, {
			populate:["id", "isPermanent", "email", "created_at", "phoneNumber", "name", "created_at", "createdBy", "updated_at", 'updatedBy']
		});
		if (!user) throw new HttpException(400, 'User does not Exist.');

		if(user.isPermanent) throw new HttpException(400, "Cannot Perform Delete Operation for this user")
		return user;
	}

	findAll=async ()=>await this.userRepository.findAll();

	findOne=async (id:string) =>await this.userRepository.findOne({id}as any)

	create = async (userData: User) => {
		const findUser = await this.userRepository.findByEmail(userData.email);
		if (findUser) throw new HttpException(400, 'User with Email Already Exists.');

		const password = await hashPassword("test@123");
		return await this.userRepository.createUser({ ...userData, password });
	};


	update = async (id:string, userData: User) => {
		const user=await this.findUserOrFail(id);

		const userWithNewEmail=await this.userRepository.findOne({ email:userData.email } as any)
		if(userWithNewEmail && userWithNewEmail.id !== id) throw new HttpException(400, "User with Email Already Exists");

		const data = wrap(user).assign(userData);
		await this.userRepository.flush();

		return data;
	};

	async	delete(id:string){
		const user=await this.findUserOrFail(id);
		await wrap(user).assign({...user, isDeleted:true});
		await this.userRepository.flush();
	}
}

export default UserService;

import { Singleton } from 'utils/decorators/singleton';
import { SqlEntityRepository } from '@mikro-orm/knex';
import { User as UserEntity, User } from './user.entity';
import { RequiredEntityData } from '@mikro-orm/core';

@Singleton
class UserRepository extends SqlEntityRepository<User>{
	findByEmail = async (email: string) => {
		//@ts-ignore
		return await this.findOne({email});
	};

	async createUser(data: RequiredEntityData<User>): Promise<User> {
		const user = new UserEntity();
		user.email = data.email;
		user.name = data.name;
		user.phoneNumber = data.phoneNumber;
		user.password = data.password;

		const create = this.create(data);
		await this.persistAndFlush(user);

		return create;
	}
}

export default UserRepository;

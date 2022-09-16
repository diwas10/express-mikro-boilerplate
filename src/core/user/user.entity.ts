import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import UserRepository from '@core/user/user.repository';
import { BaseEntity } from '../../orm/base.entity';

@Entity({ tableName: 'user', customRepository:()=>UserRepository })
export class User extends BaseEntity {

	[EntityRepositoryType]?:UserRepository

	@PrimaryKey()
	id: string = v4();

	@Property()
	name: string;

	@Property()
	email: string;

	@Property()
	phoneNumber: string;

	@Property({hidden:true})
	password: string;
}

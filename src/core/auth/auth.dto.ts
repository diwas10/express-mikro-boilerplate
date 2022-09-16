import { IsEmail, IsNotEmpty } from 'class-validator';

export class Login {
	@IsNotEmpty({ message: 'Email is Required' })
	@IsEmail({ message: 'Invalid Email Address Provided' })
	email: string;

	@IsNotEmpty({ message: 'Password is Required' })
	password: string;
}

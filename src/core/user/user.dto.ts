import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class User {
	@IsNotEmpty({ message: 'Name is Required' })
	@IsString()
	name: string;

	@IsNotEmpty({ message: 'Email is Required' })
	@IsEmail({ message: 'Invalid Email Address Provided' })
	email: string;

	@IsNotEmpty({ message: 'Phone Number is required' })
	@Length(10, 10, { message: 'Phone Number Must be of 10 digits.' })
	phoneNumber: string;
}

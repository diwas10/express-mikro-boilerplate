import { UserData } from './interface';
import jwt from 'jsonwebtoken';
import { User } from '@core/user/user.dto';

// import {users} from "../../index";

interface TokenData extends Omit<UserData, 'password'> {
	iat: number;
}

const signToken = (userData: User & {id:string}) => {
	const payload = { ...userData, iat: Date.now(), sub:userData.id };
	try {
		return jwt.sign(payload, process.env.TOKEN_SECRET, {
			algorithm: 'HS256',
			expiresIn: process.env.TOKEN_EXPIRE_TIME || '1d',
		});
	} catch (err) {
		logger.error(err);
		return null;
	}
};

const validateToken = async (token: string) => {
	try {
		return await jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		logger.error(err);
		return null;
	}
};


export { validateToken, signToken };

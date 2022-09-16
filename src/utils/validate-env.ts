import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

const validateEnv = () => {
	dotenv.config({ path: `${__dirname}/../../.env.${process.env.NODE_ENV}` });
	cleanEnv(process.env, {
		NODE_ENV: str(),
		PORT: port(),
		TOKEN_SECRET: str(),
		TOKEN_EXPIRY: str(),
		MICRO_ORM_DB_URL: str(),
		MICRO_ORM_DB_HOST: str(),
		MICRO_ORM_DB_USER: str(),
		MICRO_ORM_DB_PASSWORD: str(),
		MICRO_ORM_DB_NAME: str(),
		MICRO_ORM_DB_PORT: str(),
	});
};

export default validateEnv;

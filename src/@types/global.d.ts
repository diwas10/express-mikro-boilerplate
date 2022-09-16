import { Response as ExpResponse } from 'express';
import { Query } from 'express-serve-static-core';

declare global {
	type TLoggerFxn = (...data: any[]) => void;
	type Class<T = { [key: string]: any }> = new (...args: any[]) => T

	interface Request<Body = any, Params extends {[key:string]:string} ={},  TQuery extends Query = {},> extends Express.Request {
		body: Body;
		query: TQuery;
		params:Params
	}

	type Response = ExpResponse;

	type TLogger = {
		error: TLoggerFxn;
		success: TLoggerFxn;
		primary: TLoggerFxn;
		info: TLoggerFxn;
	}

	var logger: TLogger;

	namespace NodeJS {
		interface Global {
			logger: TLogger;
		}
	}
}

export {};

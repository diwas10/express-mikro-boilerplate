import express from 'express';
import { Server } from 'http';
import initRoutes from '@core/all-routes';
import ErrorMiddleware from '@middlewares/error.middleware';
import RouteMiddleware from '@middlewares/route.middleware';
import PassportStrategy from '@config/auth/passport-stategy';
import AuthMiddleware from '@middlewares/auth.middleware';
import cors from 'cors';
import corsOptions from '@config/cors';
import morgan from 'morgan';
import SocketController from '@core/Socket/socket.controller';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';
import { Singleton } from '@utils/decorators/singleton';
import './subscribers/before-create-update.subscriber';
import * as httpContext from 'express-http-context';

export const Mikro ={} as {
	orm: MikroORM,
	em: SqlEntityManager,
}

@Singleton
class App {
	public app: express.Express;
	public port: number | string;
	public server: Server;
	public env: string;

	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = new Server(this.app);
		this.env = process.env.NODE_ENV || 'development';

		void this.init();
		this.listen();
	}

	listen(): void {
		this.server.listen(this.port, () => {
			logger.info('*********************************');
			logger.success(`ENVIRONMENT => ${this.env.toUpperCase()}`);
			logger.info('*********************************');
			logger.success(`🚀 Application is listening on port ${this.port}`);
			logger.info('*********************************');
		});
	}

	async init(): Promise<void> {
		PassportStrategy();

		// initialize micro
		Mikro.orm = await MikroORM.init<PostgreSqlDriver>();
		Mikro.em = Mikro.orm.em;

		// initialize socket
		new SocketController(this.server);

		// before middleware
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors(corsOptions));
		this.app.use(httpContext.middleware)
		this.app.use((req, res, next) => RequestContext.create(Mikro.em, next));
		this.app.use(morgan('dev'));
		this.app.use(AuthMiddleware);

		//initialize routes
		initRoutes(this.app);

		// after middleware
		this.app.use(RouteMiddleware);
		this.app.use(ErrorMiddleware);
	}
}

export default App;

import passportJwt, { StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import validateEnv from '@utils/validate-env';
import { Mikro } from '../../app';
import { User } from '@core/user/user.entity';

validateEnv();
const options: StrategyOptions = {
	algorithms: ['HS256'],
	jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.TOKEN_SECRET,
};

const JwtStrategy = passportJwt.Strategy;
const PassportStrategy = () => {
	passport.use(new JwtStrategy(options, async (jwt_payload: any, done) => {
		try {
			const userRepository=await Mikro.em.getRepository(User);
			const user = await userRepository.findOne(jwt_payload.id)
			if (user) return done(null, user);
			return done(null, false);
		} catch (err) {
			done(err, false);
		}
	}));
};

export default PassportStrategy;

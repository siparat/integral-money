import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { StrategyKeys } from '../auth.constants';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtPayload } from '../auth.types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'generated/prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyKeys.JWT) {
	constructor(
		config: ConfigService,
		private userRepository: UserRepository
	) {
		const options: StrategyOptionsWithoutRequest = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.getOrThrow('SECRET')
		};
		super(options);
	}

	async validate({ userId }: JwtPayload): Promise<User> {
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new UnauthorizedException('Токен недействительный');
		}
		return user;
	}
}

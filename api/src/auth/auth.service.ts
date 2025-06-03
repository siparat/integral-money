import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthSuccessResponse, JwtPayload } from './auth.types';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async register(dto: AuthRegisterDto): Promise<AuthSuccessResponse> {
		const existedUser = await this.userRepository.findByEmail(dto.email);
		if (existedUser) {
			throw new ConflictException('Пользователь с такой почтой уже зарегистирован');
		}

		const entity = new UserEntity({ ...dto, passwordHash: '' });
		await entity.setPassword(dto.password);
		const createdUser = await this.userRepository.create(entity);

		const payload: JwtPayload = { userId: createdUser.id };
		const token = await this.generateJwtToken(payload);
		return { token };
	}

	async validateUser(dto: AuthLoginDto): Promise<User> {
		const existedUser = await this.userRepository.findByEmail(dto.email);
		if (!existedUser) {
			throw new NotFoundException('Пользователь с такой почтой не зарегистрирован');
		}
		const entity = new UserEntity(existedUser);
		const passwordIsCorrect = await entity.comparePassword(dto.password);
		if (!passwordIsCorrect) {
			throw new BadRequestException('Почта или пароль введен неверно');
		}
		return existedUser;
	}

	generateJwtToken(payload: JwtPayload): Promise<string> {
		return this.jwtService.signAsync(payload);
	}
}

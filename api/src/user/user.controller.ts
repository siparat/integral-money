import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserData } from './decorators/user-data.decorator';
import { User } from 'generated/prisma';

@Controller('user')
export class UserController {
	constructor(
		private userService: UserService,
		private userRepository: UserRepository
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('info')
	async info(@UserData() user: User): Promise<UserEntity> {
		return new UserEntity(user);
	}
}

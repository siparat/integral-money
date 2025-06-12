import {
	BadRequestException,
	Controller,
	FileTypeValidator,
	Get,
	ParseFilePipe,
	Patch,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserData } from './decorators/user-data.decorator';
import { User } from 'generated/prisma';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserAvatarReponse } from './user.types';

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

	@UseInterceptors(FileInterceptor('file', { limits: { fileSize: 1024 * 1024 * 5 } }))
	@UseGuards(JwtAuthGuard)
	@Patch('avatar')
	async updateAvatar(
		@UserData() user: User,
		@UploadedFile(new ParseFilePipe({ validators: [new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ })] }))
		file?: Express.Multer.File
	): Promise<UpdateUserAvatarReponse> {
		if (!file) {
			throw new BadRequestException('Изображение имеет невалидное расширение');
		}
		const path = await this.userService.updateAvatar(user.id, file);
		return { path };
	}
}

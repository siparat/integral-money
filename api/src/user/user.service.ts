import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { FileService } from 'src/file/file.service';
import { UserEntity } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
	constructor(
		private userRepository: UserRepository,
		private fileService: FileService
	) {}

	async updateAvatar(userId: string, image: Express.Multer.File): Promise<string> {
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		const entity = new UserEntity(user);

		const path = await this.fileService.writeFile(randomUUID(), image);
		entity.avatar = path;

		await this.userRepository.update(entity);

		return path;
	}
}

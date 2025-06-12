import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
	constructor(private database: DatabaseService) {}

	create(entity: UserEntity): Promise<User> {
		return this.database.user.create({ data: entity });
	}

	findById(id: string): Promise<User | null> {
		return this.database.user.findUnique({ where: { id } });
	}

	findByEmail(email: string): Promise<User | null> {
		return this.database.user.findUnique({ where: { email } });
	}

	update(entity: UserEntity): Promise<User> {
		const { id, ...data } = entity;
		return this.database.user.update({ where: { id }, data });
	}
}

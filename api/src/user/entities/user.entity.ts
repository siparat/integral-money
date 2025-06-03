import { IUserEntity } from '../user.types';
import { compare, hash } from 'bcrypt';

export class UserEntity {
	id?: string;
	email: string;
	name: string;
	passwordHash: string;
	avatar?: string;

	constructor(user: IUserEntity) {
		this.id = user.id;
		this.email = user.email;
		this.name = user.name;
		this.passwordHash = user.passwordHash;
		this.avatar = user.avatar || undefined;
	}

	async setPassword(password: string): Promise<this> {
		this.passwordHash = await hash(password, 7);
		return this;
	}

	comparePassword(password: string): Promise<boolean> {
		return compare(password, this.passwordHash);
	}
}

import { User } from 'generated/prisma';

export type IUserEntity = Omit<User, 'id' | 'updatedAt' | 'createdAt' | 'avatar'> &
	Partial<Pick<User, 'id' | 'avatar' | 'updatedAt' | 'createdAt'>>;

export interface UpdateUserAvatarReponse {
	path: string;
}

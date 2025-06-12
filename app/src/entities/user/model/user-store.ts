import { create, type StateCreator } from 'zustand';
import type { User } from './types';
import { baseApiClient } from '@/shared/api/base/client';
import { BaseApiRoutes } from '@/shared/api/base/routes';
import type { BaseApiError } from '@/shared/api/base/types';
import { isBaseApiError } from '@/shared/api/base/helpers';

interface UserStore {
	info?: User;
	isLoaded: boolean;
	fetchUserInfo(): Promise<void>;
}

const userStore: StateCreator<UserStore> = (set) => ({
	isLoaded: false,
	fetchUserInfo: async (): Promise<void> => {
		const response = await baseApiClient.get(BaseApiRoutes.GET_USER_INFO).json<User | BaseApiError>();
		if (isBaseApiError(response)) {
			set({ isLoaded: true });
			return;
		}
		set({ info: response, isLoaded: true });
	}
});

export const useUserStore = create<UserStore>(userStore);

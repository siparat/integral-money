import type { AuthResponse } from '@/features/auth/model/types';
import type { LoginDto } from '@/features/auth/ui/LoginForm/model/types';
import type { RegisterDto } from '@/features/auth/ui/RegisterForm/model/types';
import { LocalStorageKeys } from '@/shared';
import { baseApiClient } from '@/shared/api/base/client';
import { isBaseApiError } from '@/shared/api/base/helpers';
import { BaseApiRoutes } from '@/shared/api/base/routes';
import type { BaseApiError, BaseApiValidationError } from '@/shared/api/base/types';
import { create } from 'zustand';

interface AuthStore {
	token?: string;
	setToken(token: string): void;
	signUp(body: RegisterDto): Promise<void>;
	login(body: LoginDto): Promise<void>;
	logout(): void;
}

export const useAuthStore = create<AuthStore>(
	(set): AuthStore => ({
		token: localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) || undefined,
		setToken: (token): void => set({ token }),
		logout: (): void => {
			set({ token: undefined });
			localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
		},
		signUp: async (body: RegisterDto): Promise<void> => {
			const response = await baseApiClient
				.post(BaseApiRoutes.REGISTER, { json: body })
				.json<AuthResponse | BaseApiError | BaseApiValidationError>();

			if (isBaseApiError(response)) {
				throw new Error(Array.isArray(response.message) ? response.message[0] : response.message);
			}
			set({ token: response.token });
			localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, response.token);
		},
		login: async (body: LoginDto): Promise<void> => {
			const response = await baseApiClient
				.post(BaseApiRoutes.LOGIN, { json: body })
				.json<AuthResponse | BaseApiError | BaseApiValidationError>();

			if (isBaseApiError(response)) {
				throw new Error(Array.isArray(response.message) ? response.message[0] : response.message);
			}
			set({ token: response.token });
			localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, response.token);
		}
	})
);

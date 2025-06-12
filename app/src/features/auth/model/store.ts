import { create, type StateCreator } from 'zustand';

export enum AuthFormMethod {
	LOGIN = 'login',
	REGISTER = 'register'
}

interface AuthFormStore {
	authMethod: AuthFormMethod;
	toggleAuthMethod: () => void;
}

const authFormStore: StateCreator<AuthFormStore> = (set, get) => ({
	authMethod: AuthFormMethod.LOGIN,
	toggleAuthMethod: () => set({ authMethod: get().authMethod == AuthFormMethod.LOGIN ? AuthFormMethod.REGISTER : AuthFormMethod.LOGIN })
});

export const useAuthFormStore = create(authFormStore);

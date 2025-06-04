import { LocalStorageKeys } from '@/shared/config';
import ky from 'ky';

export const baseApiClient = ky.create({
	prefixUrl: import.meta.env.VITE_API_HOST,
	throwHttpErrors: false,
	hooks: {
		beforeRequest: [
			(req): void => {
				const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
				if (token) {
					req.headers.set('Authorization', 'Bearer ' + token);
				}
			}
		]
	}
});

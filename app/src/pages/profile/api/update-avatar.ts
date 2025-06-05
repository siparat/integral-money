import { baseApiClient } from '@/shared/api/base/client';
import { BaseApiRoutes } from '@/shared/api/base/routes';
import type { UpdateUserAvatarResponse } from '../model/types';
import type { BaseApiError } from '@/shared/api/base/types';
import { isBaseApiError } from '@/shared/api/base/helpers';

export const updateAvatar = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);
	const response = await baseApiClient.patch(BaseApiRoutes.UPDATE_AVATAR, { body: formData }).json<UpdateUserAvatarResponse | BaseApiError>();
	if (isBaseApiError(response)) {
		throw new Error(response.message);
	}
	return response.path;
};

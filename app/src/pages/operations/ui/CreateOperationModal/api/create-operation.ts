import { baseApiClient } from '@/shared/api/base/client';
import { BaseApiRoutes } from '@/shared/api/base/routes';
import type { CreateOperationDto } from '../model/create-operation.dto';
import { type BaseApiError, type BaseApiValidationError } from '@/shared/api/base/types';
import { type Operation } from '@/entities/operation';
import { isBaseApiError } from '@/shared/api/base/helpers';

export const createOperation = async (dto: CreateOperationDto): Promise<Operation> => {
	const response = await baseApiClient
		.post(BaseApiRoutes.CREATE_OPERATION, { json: dto })
		.json<Operation | BaseApiError | BaseApiValidationError>();
	if (isBaseApiError(response)) {
		throw new Error([response.message].flat().pop());
	}
	return response;
};

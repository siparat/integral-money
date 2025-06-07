import type { FixedCost } from '@/entities/fixed-cost';
import type { CreateFixedCostDto } from '../model/create-fixed-cost-dto';
import { baseApiClient } from '@/shared/api/base/client';
import { BaseApiRoutes } from '@/shared/api/base/routes';
import { isBaseApiError } from '@/shared/api/base/helpers';
import type { BaseApiError, BaseApiValidationError } from '@/shared/api/base/types';

export const createFixedCost = async (dto: CreateFixedCostDto): Promise<FixedCost> => {
	const response = await baseApiClient.post(BaseApiRoutes.FIXED_COST, { json: dto }).json<FixedCost | BaseApiError | BaseApiValidationError>();
	if (isBaseApiError(response)) {
		throw new Error([response.message].flat().pop());
	}
	return response;
};

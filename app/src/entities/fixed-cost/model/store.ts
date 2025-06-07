import { LocalStorageKeys } from '@/shared';
import { baseApiClient } from '@/shared/api/base/client';
import { isBaseApiError } from '@/shared/api/base/helpers';
import { BaseApiRoutes } from '@/shared/api/base/routes';
import type { BaseApiError } from '@/shared/api/base/types';
import { create } from 'zustand';
import type { FixedCost, FixedCostType, FixedCostWithType } from './types';

interface FixedCostStore {
	types: FixedCostType[];
	costs: FixedCostWithType[];
	loadTypes: () => Promise<void>;
	loadCosts: () => Promise<void>;
	deleteCostById: (id: string) => Promise<void>;
}

export const useFixedCostStore = create<FixedCostStore>(
	(set, get): FixedCostStore => ({
		types: JSON.parse(localStorage.getItem(LocalStorageKeys.FIXED_COST_TYPES) || '[]'),
		costs: [],
		loadTypes: async (): Promise<void> => {
			const response = await baseApiClient.get(BaseApiRoutes.GET_FIXED_COST_TYPES).json<FixedCostType[] | BaseApiError>();
			if (isBaseApiError(response)) {
				return set({ types: [] });
			}
			set({ types: response });
			localStorage.setItem(LocalStorageKeys.FIXED_COST_TYPES, JSON.stringify(response));
		},
		loadCosts: async (): Promise<void> => {
			const response = await baseApiClient.get(BaseApiRoutes.FIXED_COST).json<FixedCostWithType[] | BaseApiError>();
			if (isBaseApiError(response)) {
				return set({ costs: [] });
			}
			set({ costs: response });
		},
		deleteCostById: async (id: string): Promise<void> => {
			const response = await baseApiClient.delete(BaseApiRoutes.DELETE_FIXED_COST.replace(':id', id)).json<FixedCost | BaseApiError>();
			if (isBaseApiError(response)) {
				return;
			}
			set({ costs: get().costs.filter((cost) => cost.id !== response.id) });
		}
	})
);

import { LocalStorageKeys } from '@/shared';
import { baseApiClient } from '@/shared/api/base/client';
import { isBaseApiError } from '@/shared/api/base/helpers';
import { BaseApiRoutes } from '@/shared/api/base/routes';
import type { BaseApiError } from '@/shared/api/base/types';
import { create } from 'zustand';
import { OperationType, type Operation, type OperationCategory } from './types';

interface OperationStore {
	categories: Record<OperationType, OperationCategory[]>;
	operations: Operation[];
	loadCategories: () => Promise<void>;
	searchOperations: (from: Date, to: Date) => Promise<void>;
	deleteOperationById: (id: string) => Promise<void>;
}

const defaultCategoriesValue = {
	[OperationType.INCOME]: [],
	[OperationType.EXPENSE]: []
};

export const useOperationStore = create<OperationStore>(
	(set, get): OperationStore => ({
		categories: defaultCategoriesValue,
		operations: [],
		loadCategories: async (): Promise<void> => {
			const response = await baseApiClient
				.get(BaseApiRoutes.GET_ALL_CATEGORIES)
				.json<Record<OperationType, OperationCategory[]> | BaseApiError>();
			if (isBaseApiError(response)) {
				return set({ categories: defaultCategoriesValue });
			}
			set({ categories: response });
			localStorage.setItem(LocalStorageKeys.OPERATION_CATEGORIES, JSON.stringify(response));
		},
		searchOperations: async (from: Date, to: Date): Promise<void> => {
			const params = new URLSearchParams({ from: from.toISOString(), to: to.toISOString() }).toString();
			const response = await baseApiClient.get(BaseApiRoutes.SEARCH_OPERATIONS + '?' + params).json<Operation[] | BaseApiError>();
			if (isBaseApiError(response)) {
				return set({ operations: [] });
			}
			set({ operations: response });
		},
		deleteOperationById: async (id: string): Promise<void> => {
			const response = await baseApiClient.delete(BaseApiRoutes.DELETE_OPERATION.replace(':id', id)).json<Operation | BaseApiError>();
			if (isBaseApiError(response)) {
				return;
			}
			set({ operations: get().operations.filter((o) => o.id !== response.id) });
		}
	})
);

export interface Operation {
	id: string;
	updatedAt: string;
	createdAt: string;
	amount: number;
	date: string;
	categoryId: string;
	userId: string;
	category: OperationCategory;
}

export interface OperationCategory {
	id: string;
	updatedAt: string;
	createdAt: string;
	name: string;
	type: OperationType;
}

export enum OperationType {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE'
}

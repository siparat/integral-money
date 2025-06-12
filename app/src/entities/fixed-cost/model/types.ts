export interface FixedCost {
	id: string;
	updatedAt: string;
	createdAt: string;
	typeId: string;
	date?: string;
	seasonality: Seasonality;
	userId: string;
}

export interface FixedCostWithType {
	id: string;
	updatedAt: string;
	createdAt: string;
	typeId: string;
	type: FixedCostType;
	date?: string;
	seasonality: Seasonality;
	userId: string;
}

export interface FixedCostType {
	id: string;
	updatedAt: string;
	createdAt: string;
	name: string;
}

export enum Seasonality {
	ANNUAL = 'ANNUAL',
	MONTHLY = 'MONTHLY'
}

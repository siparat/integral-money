import { Seasonality } from 'generated/prisma';
import { IFixedCostEntity } from '../fixed-cost.types';

export class FixedCostEntity {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	date?: Date;
	typeId: string;
	userId: string;
	seasonality: Seasonality;

	constructor(fixedCost: IFixedCostEntity) {
		this.id = fixedCost.id;
		this.createdAt = fixedCost.createdAt;
		this.updatedAt = fixedCost.updatedAt;
		this.date = fixedCost.date ? new Date(fixedCost.date) : undefined;
		this.typeId = fixedCost.typeId;
		this.seasonality = fixedCost.seasonality;
		this.userId = fixedCost.userId;
	}
}

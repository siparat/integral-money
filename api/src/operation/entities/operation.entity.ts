import { IOperationEntity } from '../operation.types';

export class OperationEntity {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	date: Date;
	categoryId: string;
	userId: string;
	amount: number;

	constructor(operation: IOperationEntity) {
		this.id = operation.id;
		this.createdAt = operation.createdAt;
		this.updatedAt = operation.updatedAt;
		this.date = new Date(operation.date);
		this.categoryId = operation.categoryId;
		this.amount = operation.amount;
		this.userId = operation.userId;
	}
}

import { Operation, OperationCategory, OperationType } from 'generated/prisma';

export type IOperationEntity = Omit<Operation, 'id' | 'updatedAt' | 'createdAt'> &
	Partial<Pick<Operation, 'id' | 'updatedAt' | 'createdAt'>>;

export type CategoriesByType = Record<OperationType, OperationCategory[]>;

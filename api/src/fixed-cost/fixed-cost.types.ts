import { FixedCost } from 'generated/prisma';

export type IFixedCostEntity = Omit<FixedCost, 'id' | 'updatedAt' | 'createdAt' | 'date'> &
	Partial<Pick<FixedCost, 'id' | 'updatedAt' | 'createdAt' | 'date'>>;

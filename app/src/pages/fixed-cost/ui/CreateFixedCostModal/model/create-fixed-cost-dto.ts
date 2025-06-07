import type { Seasonality } from '@/entities/fixed-cost';

export interface CreateFixedCostDto {
	typeId: string;
	seasonality: Seasonality;
	date?: Date;
}

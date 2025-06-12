import { Module } from '@nestjs/common';
import { FixedCostService } from './fixed-cost.service';
import { FixedCostController } from './fixed-cost.controller';
import { FixedCostRepository } from './repositories/fixed-cost.repository';

@Module({
	controllers: [FixedCostController],
	providers: [FixedCostService, FixedCostRepository]
})
export class FixedCostModule {}

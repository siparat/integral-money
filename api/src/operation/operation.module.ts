import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { OperationRepository } from './repositories/operation.repository';

@Module({
	controllers: [OperationController],
	providers: [OperationService, OperationRepository]
})
export class OperationModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Operation, User } from 'generated/prisma';
import { CreateOperationDto } from './dto/create-operation.dto';
import { OperationRepository } from './repositories/operation.repository';
import { OperationEntity } from './entities/operation.entity';

@Injectable()
export class OperationService {
	constructor(private operationRepository: OperationRepository) {}

	async create(dto: CreateOperationDto, user: User): Promise<Operation> {
		const category = await this.operationRepository.findCategoryById(dto.categoryId);
		if (!category) {
			throw new NotFoundException(`Категория не найдена`);
		}

		const entity = new OperationEntity({ ...dto, userId: user.id });
		return this.operationRepository.create(entity);
	}
}

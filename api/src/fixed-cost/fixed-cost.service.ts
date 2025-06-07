import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FixedCost, User } from 'generated/prisma';
import { CreateFixedCostDto } from './dto/create-fixed-cost.dto';
import { FixedCostRepository } from './repositories/fixed-cost.repository';
import { FixedCostEntity } from './entities/fixed-cost.entity';

@Injectable()
export class FixedCostService {
	constructor(private fixedCostRepository: FixedCostRepository) {}

	async create(dto: CreateFixedCostDto, user: User): Promise<FixedCost> {
		const existWithThisType = await this.fixedCostRepository.findByType(dto.typeId, user.id);
		if (existWithThisType) {
			throw new ConflictException(`У вас уже открыт постоянный расход на данный вид`);
		}

		const type = await this.fixedCostRepository.findType(dto.typeId);
		if (!type) {
			throw new NotFoundException(`Не найден вид постоянного расхода`);
		}

		const entity = new FixedCostEntity({ ...dto, userId: user.id });
		return this.fixedCostRepository.create(entity);
	}

	async deleteById(id: string, user: User): Promise<FixedCost> {
		const type = await this.fixedCostRepository.getById(id);
		if (!type) {
			throw new NotFoundException(`Не найдено`);
		}

		if (type.userId !== user.id) {
			throw new ForbiddenException('Запрещено управление чужими расходами');
		}

		return this.fixedCostRepository.delete(id);
	}
}

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { FixedCostEntity } from '../entities/fixed-cost.entity';
import { FixedCost, FixedCostType } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FixedCostRepository {
	constructor(private database: DatabaseService) {}

	create(entity: FixedCostEntity): Promise<FixedCost> {
		return this.database.fixedCost.create({ data: entity });
	}

	async getMineFixedCosts(userId: string): Promise<FixedCost[]> {
		try {
			return await this.database.fixedCost.findMany({ where: { userId }, include: { type: true } });
		} catch (error) {
			return [];
		}
	}

	async getFixedCostTypes(): Promise<FixedCostType[]> {
		return this.database.fixedCostType.findMany();
	}

	async getById(id: string): Promise<FixedCost | null> {
		try {
			return await this.database.fixedCost.findUnique({ where: { id } });
		} catch (error) {
			return null;
		}
	}

	async delete(id: string): Promise<FixedCost> {
		try {
			return await this.database.fixedCost.delete({ where: { id } });
		} catch (error) {
			Logger.error(error);
			throw new InternalServerErrorException('Попробуйте позже');
		}
	}

	async findByType(typeId: string, userId: string): Promise<FixedCost | null> {
		try {
			return await this.database.fixedCost.findFirst({ where: { typeId, userId } });
		} catch (error) {
			return null;
		}
	}

	async findType(typeId: string): Promise<FixedCostType | null> {
		try {
			return await this.database.fixedCostType.findFirst({ where: { id: typeId } });
		} catch (error) {
			return null;
		}
	}

	getAllTypes(): Promise<FixedCostType[]> {
		return this.database.fixedCostType.findMany();
	}
}

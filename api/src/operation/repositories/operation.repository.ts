import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Operation, OperationCategory } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { OperationEntity } from '../entities/operation.entity';

@Injectable()
export class OperationRepository {
	constructor(private database: DatabaseService) {}

	async search(from: Date, to: Date, userId: string): Promise<Operation[]> {
		try {
			return await this.database.operation.findMany({
				where: { date: { gte: from, lte: to }, userId },
				include: { category: true },
				orderBy: { date: 'desc' }
			});
		} catch (error) {
			return [];
		}
	}

	async findCategoryById(id: string): Promise<OperationCategory | null> {
		try {
			return await this.database.operationCategory.findUnique({ where: { id } });
		} catch (error) {
			return null;
		}
	}

	async findById(id: string): Promise<Operation | null> {
		try {
			return await this.database.operation.findUnique({ where: { id } });
		} catch (error) {
			return null;
		}
	}

	async create(entity: OperationEntity): Promise<Operation> {
		try {
			return await this.database.operation.create({ data: entity, include: { category: true } });
		} catch (error) {
			Logger.error(error);
			throw new InternalServerErrorException('Произошла ошибка при создании операции, попробуйте позже');
		}
	}

	async getAllCategories(): Promise<OperationCategory[]> {
		try {
			return await this.database.operationCategory.findMany();
		} catch (error) {
			return [];
		}
	}

	async delete(id: string): Promise<Operation> {
		try {
			return await this.database.operation.delete({ where: { id }, include: { category: true } });
		} catch (error) {
			Logger.error(error);
			throw new InternalServerErrorException('Произошла ошибка при удалении операции, попробуйте позже');
		}
	}
}

import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { Operation, OperationCategory, OperationType, User } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserData } from 'src/user/decorators/user-data.decorator';
import { OperationRepository } from './repositories/operation.repository';
import { CreateOperationDto } from './dto/create-operation.dto';
import { CategoriesByType } from './operation.types';

@Controller('operation')
export class OperationController {
	constructor(
		private operationService: OperationService,
		private operationRepository: OperationRepository
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('search')
	async search(@UserData() user: User, @Query('from') from?: string, @Query('to') to?: string): Promise<Operation[]> {
		if (!from || !to) {
			throw new BadRequestException('Временной интервал не указан');
		}
		const fromDate = new Date(from);
		const toDate = new Date(to);

		if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
			throw new BadRequestException('Временной интервал указан неверно');
		}

		return this.operationRepository.search(fromDate, toDate, user.id);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Post()
	async create(@Body() dto: CreateOperationDto, @UserData() user: User): Promise<Operation> {
		return this.operationService.create(dto, user);
	}

	@Get('all-categories')
	async getAllCategories(): Promise<CategoriesByType> {
		const categories = await this.operationRepository.getAllCategories();
		return categories.reduce(
			(acc: CategoriesByType, curr: OperationCategory) => {
				acc[curr.type].push(curr);
				return acc;
			},
			{ [OperationType.EXPENSE]: [], [OperationType.INCOME]: [] }
		);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Delete(':id')
	async delete(@Param('id') id: string, @UserData() user: User): Promise<Operation> {
		const operation = await this.operationRepository.findById(id);
		if (!operation) {
			throw new NotFoundException('Операция не найдена');
		}

		if (operation.userId !== user.id) {
			throw new ForbiddenException('Запрещено управлять чужими операциями');
		}

		return this.operationRepository.delete(id);
	}
}

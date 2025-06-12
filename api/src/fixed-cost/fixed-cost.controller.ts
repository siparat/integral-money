import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FixedCostService } from './fixed-cost.service';
import { FixedCost, FixedCostType, User } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserData } from 'src/user/decorators/user-data.decorator';
import { CreateFixedCostDto } from './dto/create-fixed-cost.dto';
import { FixedCostRepository } from './repositories/fixed-cost.repository';

@Controller('fixed-cost')
export class FixedCostController {
	constructor(
		private fixedCostService: FixedCostService,
		private fixedCostRepository: FixedCostRepository
	) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(ValidationPipe)
	@Post()
	async create(@Body() dto: CreateFixedCostDto, @UserData() user: User): Promise<FixedCost> {
		return this.fixedCostService.create(dto, user);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getMineFixedCosts(@UserData() user: User): Promise<FixedCost[]> {
		return this.fixedCostRepository.getMineFixedCosts(user.id);
	}

	@Get('types')
	async getFixedCostTypes(): Promise<FixedCostType[]> {
		return this.fixedCostRepository.getFixedCostTypes();
	}

	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@UserData() user: User, @Param('id') id: string): Promise<FixedCost> {
		return this.fixedCostService.deleteById(id, user);
	}
}

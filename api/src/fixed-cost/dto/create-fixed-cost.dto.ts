import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Seasonality } from 'generated/prisma';

export class CreateFixedCostDto {
	@IsString({ message: 'Вид платежа указан неверно' })
	typeId: string;

	@IsEnum(Seasonality, { message: 'Сезонность указана неверно' })
	seasonality: Seasonality;

	@IsDate({ message: 'Дата платежа невалидна' })
	@Type(() => Date)
	@IsOptional()
	date?: Date;
}

import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString, Min } from 'class-validator';

export class CreateOperationDto {
	@Min(1, { message: 'Минимальная сумма - 1 рубль' })
	@IsInt({ message: 'Сумма указана неверно' })
	@IsInt({ message: 'Сумма указана неверно' })
	amount: number;

	@IsDate({ message: 'Дата невалидна' })
	@Type(() => Date)
	date: Date;

	@IsString({ message: 'Категория указана неверно' })
	categoryId: string;
}

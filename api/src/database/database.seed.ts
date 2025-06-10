import { Logger } from '@nestjs/common';
import { OperationType, PrismaClient } from '../../generated/prisma';

export const runSeed = async (): Promise<void> => {
	const instance = new PrismaClient();
	try {
		await instance.$connect();
		await instance.fixedCostType.createMany({
			data: [
				{ name: 'Ипотека' },
				{ name: 'Кредит' },
				{ name: 'Обучение' },
				{ name: 'Коммунальные услуги' },
				{ name: 'Связь' },
				{ name: 'Прочие административные расходы' },
				{ name: 'Налоги' }
			]
		});
		await instance.operationCategory.createMany({
			data: [
				{ type: OperationType.INCOME, name: 'Зарплата' },
				{ type: OperationType.INCOME, name: 'Пенсия' },
				{ type: OperationType.INCOME, name: 'Переводы' },
				{ type: OperationType.INCOME, name: 'Пособия' },
				{ type: OperationType.INCOME, name: 'Доходы от дивидендов (инвестиций)' },
				{ type: OperationType.INCOME, name: 'Кэшбэк' },
				{ type: OperationType.INCOME, name: 'Другое' },

				{ type: OperationType.EXPENSE, name: 'Продукты' },
				{ type: OperationType.EXPENSE, name: 'Транспорт' },
				{ type: OperationType.EXPENSE, name: 'Здоровье' },
				{ type: OperationType.EXPENSE, name: 'Машина' },
				{ type: OperationType.EXPENSE, name: 'Развлечение' },
				{ type: OperationType.EXPENSE, name: 'Салоны красоты' },
				{ type: OperationType.EXPENSE, name: 'Инвестиции' },
				{ type: OperationType.EXPENSE, name: 'Переводы' }
			]
		});
	} catch (error) {
		Logger.error(error);
	} finally {
		await instance.$disconnect();
	}
};

runSeed();

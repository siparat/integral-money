import { Logger } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

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
	} catch (error) {
		Logger.error(error);
	} finally {
		await instance.$disconnect();
	}
};

runSeed();

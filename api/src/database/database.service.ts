import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleDestroy(): Promise<void> {
		await this.$connect();
	}

	async onModuleInit(): Promise<void> {
		await this.$disconnect();
	}
}

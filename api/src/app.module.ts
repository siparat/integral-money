import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot({ isGlobal: true })]
})
export class AppModule {}

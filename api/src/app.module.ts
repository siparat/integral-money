import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { path } from 'app-root-path';

@Module({
	imports: [
		UserModule,
		AuthModule,
		DatabaseModule,
		ConfigModule.forRoot({ isGlobal: true }),
		ServeStaticModule.forRoot({
			rootPath: `${join(path, 'uploads')}`,
			serveRoot: '/uploads',
			serveStaticOptions: {
				index: false
			}
		})
	]
})
export class AppModule {}

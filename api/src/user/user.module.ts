import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from './repositories/user.repository';

@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository]
})
export class UserModule {}

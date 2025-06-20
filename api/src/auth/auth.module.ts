import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/configs/jwt.config';

@Module({
	imports: [UserModule, JwtModule.registerAsync(getJwtConfig())],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

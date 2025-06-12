import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthSuccessResponse, JwtPayload } from './auth.types';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UsePipes(ValidationPipe)
	@Post('register')
	async register(@Body() dto: AuthRegisterDto): Promise<AuthSuccessResponse> {
		return this.authService.register(dto);
	}

	@UsePipes(ValidationPipe)
	@Post('login')
	async login(@Body() dto: AuthLoginDto): Promise<AuthSuccessResponse> {
		const user = await this.authService.validateUser(dto);
		const payload: JwtPayload = { userId: user.id };
		const token = await this.authService.generateJwtToken(payload);
		return { token };
	}
}

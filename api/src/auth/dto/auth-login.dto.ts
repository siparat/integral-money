import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
	@IsEmail(undefined, { message: 'Почта должна иметь вид: user@email.ru' })
	email: string;

	@MaxLength(32, { message: 'Максимальная длина пароля 32 символов' })
	@MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
	@IsString({ message: 'Пароль должен быть строкой' })
	password: string;
}

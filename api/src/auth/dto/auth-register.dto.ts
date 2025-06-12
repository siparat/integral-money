import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthRegisterDto {
	@MaxLength(64, { message: 'ФИО слишком длинное' })
	@MinLength(6, { message: 'ФИО слишком короткое' })
	@IsString({ message: 'ФИО должно быть строкой' })
	name: string;

	@IsEmail(undefined, { message: 'Почта должна иметь вид: user@email.ru' })
	email: string;

	@MaxLength(32, { message: 'Максимальная длина пароля 32 символов' })
	@MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
	@IsString({ message: 'Пароль должен быть строкой' })
	password: string;
}

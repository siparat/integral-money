import { Button, FormCard, Input, Routes } from '@/shared';
import { useRef, type JSX } from 'react';
import styles from '../../styles.module.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type RegisterDto } from '../model/types';
import { useAuthStore } from '@/entities/user';
import { useNavigate } from 'react-router-dom';
import { useAuthFormStore } from '@/features/auth/model/store';

export const RegisterForm = (): JSX.Element => {
	const signUp = useAuthStore((state) => state.signUp);
	const toggleAuthMethod = useAuthFormStore((state) => state.toggleAuthMethod);
	const navigate = useNavigate();

	const confirmedPassword = useRef<HTMLInputElement>(null);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<RegisterDto>();

	const onSubmit: SubmitHandler<RegisterDto> = async (data: RegisterDto): Promise<void> => {
		if (confirmedPassword.current?.value !== data.password) {
			return setError('password', { message: 'Пароли не совпадают' });
		}
		try {
			await signUp(data);
			await navigate(Routes.MAIN);
		} catch (error) {
			if (error instanceof Error) {
				setError('root', { message: error.message });
			}
		}
	};

	return (
		<FormCard title="Регистрация">
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Input
					error={errors.name?.message}
					{...register('name', {
						maxLength: { value: 64, message: 'ФИО слишком длинное' },
						minLength: { value: 6, message: 'ФИО слишком короткое' },
						required: { value: true, message: 'Укажите ФИО' }
					})}
					label="ФИО:"
					type="text"
				/>
				<Input
					error={errors.email?.message}
					{...register('email', { required: { value: true, message: 'Укажите почту' } })}
					label="Электронная почта:"
					type="email"
				/>

				<Input
					error={errors.password?.message}
					{...register('password', {
						maxLength: { value: 32, message: 'Максимальная длина пароля 32 символов' },
						minLength: { value: 8, message: 'Минимальная длина пароля 8 символов' },
						required: { value: true, message: 'Укажите пароль' }
					})}
					label="Пароль:"
					type="password"
				/>
				<Input ref={confirmedPassword} label="Повторите пароль:" type="password" />
				<Button>Зарегистрироваться</Button>
			</form>
			{errors.root && <p className={styles.error}>{errors.root.message}</p>}
			<p className={styles.toggleMessage}>
				Уже есть аккаунт? <button onClick={toggleAuthMethod}>Войти здесь.</button>
			</p>
		</FormCard>
	);
};

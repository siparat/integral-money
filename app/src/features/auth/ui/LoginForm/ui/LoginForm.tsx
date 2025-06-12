import { Button, FormCard, Input, Routes } from '@/shared';
import { type JSX } from 'react';
import styles from '../../styles.module.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type LoginDto } from '../model/types';
import { useAuthStore, useUserStore } from '@/entities/user';
import { useNavigate } from 'react-router-dom';
import { useAuthFormStore } from '@/features/auth/model/store';

export const LoginForm = (): JSX.Element => {
	const login = useAuthStore((state) => state.login);
	const toggleAuthMethod = useAuthFormStore((state) => state.toggleAuthMethod);
	const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<LoginDto>();

	const onSubmit: SubmitHandler<LoginDto> = async (data: LoginDto): Promise<void> => {
		try {
			await login(data);
			await fetchUserInfo();
			await navigate(Routes.MAIN, { replace: true });
		} catch (error) {
			if (error instanceof Error) {
				setError('root', { message: error.message });
			}
		}
	};

	return (
		<FormCard title="Вход">
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
				<Button>Войти</Button>
			</form>
			{errors.root && <p className={styles.error}>{errors.root.message}</p>}
			<p className={styles.toggleMessage}>
				Нет аккаунта? <button onClick={toggleAuthMethod}>Зарегистрируйтесь здесь.</button>
			</p>
		</FormCard>
	);
};

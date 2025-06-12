import { LoginForm, RegisterForm } from '@/features/auth';
import type { JSX } from 'react';
import styles from './AuthPage.module.css';
import { AuthFormMethod, useAuthFormStore } from '@/features/auth/model/store';
import { Helmet } from 'react-helmet-async';

export const AuthPage = (): JSX.Element => {
	const authMethod = useAuthFormStore((state) => state.authMethod);

	return (
		<>
			<Helmet>
				<title>Авторизация | Интеграл + Money</title>
			</Helmet>
			<div className={styles.authPage}>{authMethod == AuthFormMethod.LOGIN ? <LoginForm /> : <RegisterForm />}</div>
		</>
	);
};

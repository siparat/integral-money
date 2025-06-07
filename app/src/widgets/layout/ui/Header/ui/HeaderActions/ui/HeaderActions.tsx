import type { HTMLAttributes, JSX } from 'react';
import styles from './HeaderActions.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Routes } from '@/shared';
import { useAuthStore } from '@/entities/user';
import { useThemeStore } from '@/shared/model/theme-store';

export const HeaderActions = ({ className, ...props }: HTMLAttributes<HTMLUListElement>): JSX.Element => {
	const token = useAuthStore((state) => state.token);
	const switchTheme = useThemeStore((state) => state.switchTheme);

	return (
		<ul className={cn(className, styles.actions)} {...props}>
			{token ? (
				<li>
					<NavLink to={Routes.PROFILE}>Личный кабинет</NavLink>
				</li>
			) : (
				<li>
					<NavLink to={Routes.AUTHORIZATION}>Вход/Регистрация</NavLink>
				</li>
			)}

			<li>
				<button onClick={switchTheme}>Сменить тему</button>
			</li>
		</ul>
	);
};

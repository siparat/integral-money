import type { HTMLAttributes, JSX } from 'react';
import styles from './HeaderActions.module.css';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Routes } from '@/shared';

export const HeaderActions = ({ className, ...props }: HTMLAttributes<HTMLUListElement>): JSX.Element => {
	return (
		<ul className={cn(className, styles.actions)} {...props}>
			<li>
				<NavLink to={Routes.AUTHORIZATION}>Вход/Регистрация</NavLink>
			</li>
			<li>
				<button>Сменить тему</button>
			</li>
		</ul>
	);
};

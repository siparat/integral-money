import type { HTMLAttributes, JSX } from 'react';
import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import { HeaderMenu } from './HeaderMenu/ui/HeaderMenu';
import styles from './Header.module.css';
import { HeaderActions } from './HeaderActions/ui/HeaderActions';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { Routes } from '@/shared';

export const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>): JSX.Element => {
	const { pathname } = useLocation();

	return (
		<header className={cn(styles.header, className)} {...props}>
			<LogoIcon className={styles.logo} />
			{pathname !== Routes.AUTHORIZATION && <HeaderMenu />}
			<HeaderActions />
		</header>
	);
};

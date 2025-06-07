import type { HTMLAttributes, JSX } from 'react';
import LightLogoIcon from '@/shared/assets/icons/logo-light.svg?react';
import DarkLogoIcon from '@/shared/assets/icons/logo-dark.svg?react';
import { HeaderMenu } from './HeaderMenu/ui/HeaderMenu';
import styles from './Header.module.css';
import { HeaderActions } from './HeaderActions/ui/HeaderActions';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { Routes } from '@/shared';
import { useThemeStore } from '@/shared/model/theme-store';

export const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>): JSX.Element => {
	const { pathname } = useLocation();
	const appearance = useThemeStore((state) => state.appearance);

	return (
		<header className={cn(styles.header, className)} {...props}>
			{appearance == 'light' ? <LightLogoIcon className={styles.logo} /> : <DarkLogoIcon className={styles.logo} />}
			{pathname !== Routes.AUTHORIZATION && <HeaderMenu />}
			<HeaderActions />
		</header>
	);
};

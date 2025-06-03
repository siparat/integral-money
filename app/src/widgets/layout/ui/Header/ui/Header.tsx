import type { JSX } from 'react';
import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import { HeaderMenu } from './HeaderMenu/ui/HeaderMenu';
import styles from './Header.module.css';
import { HeaderActions } from './HeaderActions/ui/HeaderActions';

export const Header = (): JSX.Element => {
	return (
		<header className={styles.header}>
			<LogoIcon className={styles.logo} />
			<HeaderMenu />
			<HeaderActions />
		</header>
	);
};

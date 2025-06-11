import { useState, type HTMLAttributes, type JSX } from 'react';
import LightLogoIcon from '@/shared/assets/icons/logo-light.svg?react';
import DarkLogoIcon from '@/shared/assets/icons/logo-dark.svg?react';
import { HeaderMenu } from './HeaderMenu/ui/HeaderMenu';
import styles from './Header.module.css';
import { HeaderActions } from './HeaderActions/ui/HeaderActions';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { Routes } from '@/shared';
import { useThemeStore } from '@/shared/model/theme-store';
import { BurgerMenu } from './BurgerMenu/ui/BurgerMenu';
import BurgerMenuIcon from '@/shared/assets/icons/burger-menu.svg?react';

export const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>): JSX.Element => {
	const { pathname } = useLocation();
	const appearance = useThemeStore((state) => state.appearance);
	const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState<boolean>(false);

	return (
		<header className={cn(styles.header, className)} {...props}>
			{appearance == 'light' ? <LightLogoIcon className={styles.logo} /> : <DarkLogoIcon className={styles.logo} />}
			{pathname !== Routes.AUTHORIZATION && <HeaderMenu className={styles.headerMenu} />}
			<HeaderActions className={styles.headerActions} />
			{burgerMenuIsOpen && <BurgerMenu close={() => setBurgerMenuIsOpen(false)} />}
			<button className={styles.burgerButton} onClick={() => setBurgerMenuIsOpen(true)}>
				<BurgerMenuIcon />
			</button>
		</header>
	);
};

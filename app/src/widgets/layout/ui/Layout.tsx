import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { Header } from './Header/ui/Header';

export const Layout = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<Header className={styles.header} />
			<main className={styles.content}>
				<Outlet />
			</main>
		</div>
	);
};

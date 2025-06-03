import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = (): JSX.Element => {
	return (
		<div>
			<header>Header</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

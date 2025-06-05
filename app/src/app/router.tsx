import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { Layout } from '../widgets/layout';
import { Routes } from '@/shared';
import { AuthPage } from '@/pages/auth';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={Routes.MAIN} element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route path={Routes.AUTHORIZATION} element={<AuthPage />} />
		</Route>
	)
);

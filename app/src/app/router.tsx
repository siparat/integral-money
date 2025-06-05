import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { Layout } from '../widgets/layout';
import { Routes } from '@/shared';
import { AuthPage } from '@/pages/auth';
import { ProfilePage } from '@/pages/profile';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={Routes.MAIN} element={<Layout />}>
			<Route
				index
				element={
					<ProtectedRoute>
						<HomePage />
					</ProtectedRoute>
				}
			/>
			<Route path={Routes.AUTHORIZATION} element={<AuthPage />} />
			<Route
				path={Routes.PROFILE}
				element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>
		</Route>
	)
);

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from '../widgets/layout';
import { Routes } from '@/shared';
import { AuthPage } from '@/pages/auth';
import { ProfilePage } from '@/pages/profile';
import { ProtectedRoute } from './ProtectedRoute';
import { SubscribesPage } from '@/pages/subscribes';
import { OrderService } from '@/pages/order-service';
import { FixedCostPage } from '@/pages/fixed-cost';
import { OperationsPage } from '@/pages/operations';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={Routes.MAIN} element={<Layout />}>
			<Route
				index
				element={
					<ProtectedRoute>
						<OperationsPage />
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
			<Route
				path={Routes.SUBSCRIBES}
				element={
					<ProtectedRoute>
						<SubscribesPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path={Routes.ORDER_SERVICE}
				element={
					<ProtectedRoute>
						<OrderService />
					</ProtectedRoute>
				}
			/>
			<Route
				path={Routes.FIXED_COSTS}
				element={
					<ProtectedRoute>
						<FixedCostPage />
					</ProtectedRoute>
				}
			/>
		</Route>
	)
);

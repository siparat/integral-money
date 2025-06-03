import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { Layout } from '../widgets/layout';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<HomePage />} />
		</Route>
	)
);

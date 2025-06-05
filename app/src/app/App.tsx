import type { JSX } from 'react';
import './styles/index.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { UserProvider } from './providers/user-provider';

function App(): JSX.Element {
	return (
		<HelmetProvider>
			<Helmet>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
			</Helmet>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</HelmetProvider>
	);
}

export default App;

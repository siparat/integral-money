import { useUserStore } from '@/entities/user';
import { Routes } from '@/shared';
import { type JSX, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: Required<PropsWithChildren>): JSX.Element => {
	const user = useUserStore((state) => state.info);
	const isLoaded = useUserStore((state) => state.isLoaded);

	if (!user && isLoaded) {
		return <Navigate to={Routes.AUTHORIZATION} replace />;
	}

	return <>{children}</>;
};

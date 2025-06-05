import { useUserStore } from '@/entities/user';
import { useEffect, type JSX, type ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const UserProvider = ({ children }: Props): JSX.Element => {
	const fetchUser = useUserStore((state) => state.fetchUserInfo);

	useEffect(() => {
		fetchUser();
	}, []);

	return <>{children}</>;
};

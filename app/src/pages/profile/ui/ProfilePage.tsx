import { useAuthStore, useUserStore } from '@/entities/user';
import { useState, type ChangeEvent, type JSX } from 'react';
import styles from './Profile.module.css';
import dayjs from 'dayjs';
import { Button, Routes } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { updateAvatar } from '../api/update-avatar';
import { constructAvatarUrl } from '../lib/construct-avatar-url';

export const ProfilePage = (): JSX.Element => {
	const user = useUserStore((state) => state.info);
	const refetchUser = useUserStore((state) => state.fetchUserInfo);
	const [error, setError] = useState<string | null>(null);
	const logoutUser = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	if (!user) {
		return <></>;
	}

	const logout = (): void => {
		logoutUser();
		navigate(Routes.AUTHORIZATION);
	};

	const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
		setError(null);
		const file = e.target.files![0];
		if (file.size > 1024 * 1024 * 5) {
			return setError('Размер файла слишком большой');
		}
		await updateAvatar(file);
		await refetchUser();
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>Мой профиль</h1>
			<section className={styles.wrapper}>
				<div>
					<div className={styles.avatar}>
						{user.avatar ? (
							<img src={constructAvatarUrl(user.avatar)} alt={user?.id} />
						) : (
							<label htmlFor="avatarActionButton" className={styles.imgSkeleton}>
								Загрузить фото
							</label>
						)}
					</div>
					<div className={styles.avatarAction}>
						<input onChange={onAvatarChange} accept="image/png, image/jpeg, image/webp" id="avatarActionButton" type="file" />
						<label htmlFor="avatarActionButton">Сменить фото</label>
						{error && <p className={styles.error}>{error}</p>}
					</div>
				</div>
				<div className={styles.content}>
					<div>
						<h3>ФИО:</h3>
						<p>{user.name}</p>
					</div>
					<div>
						<h3>Почта:</h3>
						<p>{user.email}</p>
					</div>
					<div>
						<h3>Дата регистрации:</h3>
						<p>{dayjs(user.createdAt).format('DD.MM.YYYY')}</p>
					</div>
				</div>
			</section>
			<section className={styles.actions}>
				<div className={styles.actionsGrid}>
					<Button>Настройки</Button>
					<Button>Настройки темы</Button>
					<Button>Управление подписками</Button>
					<Button>Подключить аккаунт</Button>
				</div>
			</section>
			<button onClick={logout} className={styles.exitActionButton}>
				Выйти
			</button>
		</div>
	);
};

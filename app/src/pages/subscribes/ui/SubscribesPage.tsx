import type { JSX } from 'react';
import styles from './SubscribesPage.module.css';
import { subscribes } from '../model/subscribes';
import { Button } from '@/shared';
import { Helmet } from 'react-helmet-async';

export const SubscribesPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Подписки | Интеграл + Money</title>
			</Helmet>
			<div className={styles.page}>
				{subscribes.map((s) => {
					return (
						<div key={s.title} className={styles.element}>
							<h2 className={styles.title}>{s.title}</h2>
							<ul className={styles.advantages}>
								{s.advantages.map((a) => (
									<li key={a}>{a}</li>
								))}
							</ul>
							<div>
								<span className={styles.cost}>{s.cost}</span>
								{s.buttonIsVisible && <Button>Оформить</Button>}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

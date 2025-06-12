import type { JSX } from 'react';
import styles from './OrderService.module.css';
import { orders } from '../model/orders';
import { Button } from '@/shared';
import { Helmet } from 'react-helmet-async';

export const OrderService = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Найти специалиста | Интеграл + Money</title>
			</Helmet>
			<div className={styles.page}>
				<p className={styles.description}>
					Испытываете трудности с управлением финансами: будь то избыток средств или их хроническая нехватка? Наши специалисты готовы
					помочь вам грамотно распорядиться вашими финансами.
				</p>
				{orders.map((o) => {
					return (
						<div className={styles.element} key={o.name}>
							<div className={styles.avatarWrapper}>
								<div className={styles.avatar}>
									<img src={o.avatar} alt={o.name} />
								</div>
								<h3 className={styles.name}>Специалист {o.name}</h3>
							</div>
							<div className={styles.contentWrapper}>
								<div className={styles.properties}>
									<div className={styles.property}>
										<p>Экспертиза:</p>
										<p>{o.expertise}</p>
									</div>
									<div className={styles.property}>
										<p>Фокус:</p>
										<p>{o.focus}</p>
									</div>
									<div className={styles.property}>
										<p>Опыт:</p>
										<p>{o.experience}</p>
									</div>
								</div>
								<Button>Первая пробная консультация</Button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

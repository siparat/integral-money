import { useFixedCostStore } from '@/entities/fixed-cost';
import { Button } from '@/shared';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { useEffect, type JSX } from 'react';
import styles from './FixedCostPage.module.css';
import { CreateFixedCostModal } from './CreateFixedCostModal/ui/CreateFixedCostModal';
import { FixedCostCard } from './FIxedCostCard/ui/FixedCostCard';
import { Helmet } from 'react-helmet-async';

export const FixedCostPage = (): JSX.Element => {
	const { costs, loadCosts, loadTypes } = useFixedCostStore();

	useEffect(() => {
		loadCosts();
		loadTypes();
	}, []);

	return (
		<>
			<Helmet>
				<title>Постоянные расходы | Интеграл + Money</title>
			</Helmet>
			<div className={styles.page}>
				<Root>
					<Trigger asChild>
						<Button className={styles.triggerButton}>+ Добавить постоянные расходы</Button>
					</Trigger>
					<CreateFixedCostModal />
				</Root>

				<div className={styles.costsWrapper}>
					{costs.length ? (
						costs.map((c) => <FixedCostCard key={c.id} data={c} />)
					) : (
						<p className={styles.emptyMessage}>У вас нет постоянных расходов!</p>
					)}
				</div>
			</div>
		</>
	);
};

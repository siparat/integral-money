import { Seasonality, useFixedCostStore, type FixedCostWithType } from '@/entities/fixed-cost';
import type { HTMLAttributes, JSX } from 'react';
import styles from './FixedCostCard.module.css';
import cn from 'classnames';
import dayjs from 'dayjs';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';

interface Props extends HTMLAttributes<HTMLDivElement> {
	data: FixedCostWithType;
}

export const FixedCostCard = ({ className, data, ...props }: Props): JSX.Element => {
	const deleteById = useFixedCostStore((state) => state.deleteCostById);

	const onDelete = async (): Promise<void> => {
		await deleteById(data.id);
	};

	return (
		<div className={cn(className, styles.card)} {...props}>
			<h2 className={styles.title}>{data.type.name}</h2>
			<div className={styles.description}>
				<p>
					Выплаты: <span>{data.seasonality == Seasonality.ANNUAL ? 'Ежегодно' : 'Ежемесячно'}</span>
				</p>
				{data.date && (
					<p>
						<span>Дата платежа: {dayjs(data.date).format('DD.MM.YYYY')}</span>
					</p>
				)}
			</div>
			<button onClick={onDelete} className={styles.deleteButton}>
				<DeleteIcon />
			</button>
		</div>
	);
};

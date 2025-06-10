import { OperationType, useOperationStore, type Operation } from '@/entities/operation';
import { useMemo, type HTMLAttributes, type JSX } from 'react';
import cn from 'classnames';
import styles from './Operation.module.css';
import dayjs from 'dayjs';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';

interface Props extends HTMLAttributes<HTMLDivElement> {
	data: Operation;
}

export const OperationCard = ({ className, data, ...props }: Props): JSX.Element => {
	const deleteById = useOperationStore((state) => state.deleteOperationById);
	const isIncome = useMemo(() => data.category.type == OperationType.INCOME, [data]);
	const getDateString = (date: Date): string => {
		return dayjs(date).format(new Date().getFullYear() == date.getFullYear() ? 'DD.MM' : 'DD.MM.YYYY');
	};

	return (
		<div className={cn(className, styles.card)} {...props}>
			<h4 className={styles.title}>{data.category.type == OperationType.EXPENSE ? 'Расход' : 'Доход'}</h4>
			<div className={styles.info}>
				<p>Дата: {getDateString(new Date(data.date))}</p>
				<p>Категория: {data.category.name}</p>
				<p>
					₽:{' '}
					<span className={styles[data.category.type.toString().toLowerCase()]}>
						{isIncome ? '+' : '-'}
						{data.amount}
					</span>
				</p>
			</div>
			<div className={styles.actions}>
				<button onClick={() => deleteById(data.id)} className={styles.deleteButton}>
					<TrashIcon className={styles.icon} />
				</button>
			</div>
		</div>
	);
};

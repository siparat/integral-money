import { Portal, Overlay, Content, DialogTitle } from '@radix-ui/react-dialog';
import type { JSX } from 'react';
import styles from './CreateFixedCostModal.module.css';
import cn from 'classnames';
import { Button } from '@/shared';
import { Seasonality, useFixedCostStore } from '@/entities/fixed-cost';
import { useForm } from 'react-hook-form';
import type { CreateFixedCostDto } from '../model/create-fixed-cost-dto';
import { useNavigate } from 'react-router-dom';
import { createFixedCost } from '../api/create-fixed-cost';

export const CreateFixedCostModal = (): JSX.Element => {
	const types = useFixedCostStore((state) => state.types);
	const reload = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<CreateFixedCostDto>();

	const onSubmit = async (data: CreateFixedCostDto): Promise<void> => {
		data.date = data.date || undefined;
		try {
			await createFixedCost(data);
			await reload(0);
		} catch (error) {
			if (error instanceof Error) {
				setError('root', { message: error.message });
			}
		}
	};

	return (
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className={cn('dialogContent', styles.content)}>
				<DialogTitle className={styles.title}>Введите данные:</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<fieldset className={styles.element}>
						<h4 className={styles.inputTitle}>Вид постоянного расхода:</h4>
						<select
							{...register('typeId', { required: { value: true, message: 'Выберите вид постоянного расхода' } })}
							className={styles.openButton}>
							<option value={undefined}>Ипотека, кредит.....</option>
							{types.map((t) => (
								<option key={t.id} value={t.id}>
									{t.name}
								</option>
							))}
						</select>
						<p className={styles.error}>{errors.typeId?.message}</p>
					</fieldset>
					<fieldset className={styles.element}>
						<h4 className={styles.inputTitle}>Выплаты:</h4>
						<select
							{...register('seasonality', { required: { value: true, message: 'Выберите сезонность выплаты' } })}
							className={styles.openButton}>
							<option value={undefined}>Ежемесечно, ежегодно...</option>
							<option value={Seasonality.MONTHLY}>Ежемесячно</option>
							<option value={Seasonality.ANNUAL}>Ежегодно</option>
						</select>
						<p className={styles.error}>{errors.seasonality?.message}</p>
					</fieldset>
					<fieldset className={styles.element}>
						<h4 className={styles.inputTitle}>Дата платежа (если есть фиксированная):</h4>
						<input {...register('date')} className={styles.openButton} type="date" />
					</fieldset>
					{errors.root && <p className={styles.error}>{errors.root.message}</p>}
					<Button className={styles.button}>Подтвердить</Button>
				</form>
			</Content>
		</Portal>
	);
};

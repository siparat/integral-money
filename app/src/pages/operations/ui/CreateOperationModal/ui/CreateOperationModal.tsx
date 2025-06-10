import { OperationType, useOperationStore } from '@/entities/operation';
import { Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import type { HTMLAttributes, JSX } from 'react';
import styles from './CreateOperationModal.module.css';
import cn from 'classnames';
import { Button } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { CreateOperationDto } from '../model/create-operation.dto';
import { createOperation } from '../api/create-operation';

interface Props extends HTMLAttributes<HTMLDivElement> {
	type: OperationType;
}

export const CreateOperationModal = ({ type, ...props }: Props): JSX.Element => {
	const categories = useOperationStore((state) => state.categories);
	const reload = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<CreateOperationDto>();

	const onSubmit = async (data: CreateOperationDto): Promise<void> => {
		try {
			await createOperation(data);
			await reload(0);
		} catch (error) {
			if (error instanceof Error) {
				setError('root', { message: error.message });
			}
		}
	};

	return (
		<Portal {...props}>
			<Overlay className="dialogOverlay" />
			<Content className={cn('dialogContent', styles.content)}>
				<DialogTitle className={styles.title}>Введите данные:</DialogTitle>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<fieldset className={styles.element}>
						<h4 className={styles.inputTitle}>{type == OperationType.EXPENSE ? 'Расход' : 'Доход'}, ₽:</h4>
						<input
							className={styles.amountInput}
							{...register('amount', {
								valueAsNumber: true,
								required: { value: true, message: 'Введите сумму' },
								min: { value: 1, message: 'Введите сумму' }
							})}
							type="number"
						/>
						<p className={styles.error}>{errors.amount?.message}</p>
					</fieldset>
					<fieldset className={styles.element}>
						<h4 className={styles.inputTitle}>Дата:</h4>
						<input
							{...register('date', { required: { value: true, message: 'Укажите дату' } })}
							className={styles.dateInput}
							type="date"
						/>
						<p className={styles.error}>{errors.date?.message}</p>
					</fieldset>
					<fieldset className={styles.element}>
						<h4 className={styles.inputTitle}>Категория:</h4>
						<select
							className={styles.categorySelect}
							{...register('categoryId', { required: { value: true, message: 'Выберите категорию' } })}>
							{categories[type].map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
						<p className={styles.error}>{errors.categoryId?.message}</p>
					</fieldset>
					{errors.root && <p className={styles.error}>{errors.root.message}</p>}
					<Button className={styles.button}>{type == OperationType.EXPENSE ? 'Добавить расходы' : 'Добавить доходы'}</Button>
				</form>
			</Content>
		</Portal>
	);
};

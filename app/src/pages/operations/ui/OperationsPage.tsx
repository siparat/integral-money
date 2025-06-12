import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useMemo, useState, type JSX } from 'react';
import styles from './OperationsPage.module.css';
import { Button } from '@/shared';
import ArrowIcon from '@/shared/assets/icons/arrow-left.svg?react';
import { OperationType, useOperationStore } from '@/entities/operation';
import { DateRange, type Range, type RangeKeyDict } from 'react-date-range';
import dayjs from 'dayjs';
import { OperationCard } from './OperationCard/ui/OperationCard';
import { Helmet } from 'react-helmet-async';
import { Root } from '@radix-ui/react-dialog';
import { CreateOperationModal } from './CreateOperationModal/ui/CreateOperationModal';
import { PieOperationsChart } from './PieChart/ui/PieChart';
import { LinearChart } from './LinearChart/ui/LinearChart';
import cn from 'classnames';

const chartTypes = ['linear', 'pie'] as const;

export const OperationsPage = (): JSX.Element => {
	const [type, setType] = useState<OperationType | null>(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [chartType, setChartType] = useState<(typeof chartTypes)[number]>('linear');
	const [dateRange, setDateRange] = useState<Range>({
		startDate: dayjs().startOf('month').toDate(),
		endDate: dayjs().endOf('month').toDate(),
		key: '0'
	});
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const { operations, loadCategories, searchOperations } = useOperationStore();

	const toggleChart = (): void => {
		setChartType(chartTypes[(chartTypes.indexOf(chartType) + 1) % 2] as (typeof chartTypes)[number]);
	};

	const onDateRangeChange = (ranges: RangeKeyDict): void => {
		const range = ranges[0];
		setDateRange(range);
	};

	const handleOpen = (operationType: OperationType): void => {
		setType(operationType);
		setModalIsOpen(true);
	};

	const constructDateRangeString = (): string => {
		if (!dateRange.startDate || !dateRange.endDate) {
			return '';
		}
		const from = dayjs(dateRange.startDate).format('DD.MM.YYYY');
		const to = dayjs(dateRange.endDate).format('DD.MM.YYYY');
		return `${from} – ${to}`;
	};

	useEffect(() => {
		loadCategories();
		if (dateRange.startDate && dateRange.endDate) {
			searchOperations(dateRange.startDate, dateRange.endDate);
		}
	}, []);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			searchOperations(dateRange.startDate, dateRange.endDate);
		}
	}, [dateRange]);

	const chart = useMemo(() => {
		return chartType == 'linear' ? (
			<>
				<LinearChart type={OperationType.INCOME} />
				<LinearChart type={OperationType.EXPENSE} />
			</>
		) : (
			<>
				<PieOperationsChart type={OperationType.INCOME} />
				<PieOperationsChart type={OperationType.EXPENSE} />
			</>
		);
	}, [chartType]);

	return (
		<>
			<Helmet>
				<title>Постоянные расходы | Интеграл + Money</title>
			</Helmet>
			<div className={styles.page}>
				<div className={styles.wrapper}>
					<div className={styles.actions}>
						<h3 className={styles.actionTitle}>Заполнить диаграмму:</h3>
						<div className={styles.actionButtons}>
							<Root open={modalIsOpen} onOpenChange={setModalIsOpen}>
								<Button onClick={() => handleOpen(OperationType.INCOME)}>Добавить доходы</Button>
								<Button onClick={() => handleOpen(OperationType.EXPENSE)}>Добавить расходы</Button>
								{type !== null && <CreateOperationModal type={type} />}
							</Root>
						</div>
					</div>
					<div className={cn(styles.diagrams, styles.diagramsDesktop, { [styles.diagramsPie]: chartType == 'pie' })}>
						{operations.length ? chart : <p className={styles.emptyMessage}>Доходов и расходов нет</p>}
					</div>
					<div className={styles.params}>
						<div className={styles.diagramChanger}>
							<button onClick={toggleChart}>
								<ArrowIcon />
							</button>
							<p>Сменить диаграмму</p>
							<button onClick={toggleChart}>
								<ArrowIcon style={{ transform: 'rotateY(180deg)' }} />
							</button>
						</div>
						<div className={styles.dateChanger}>
							<p>Показывать за определенный период:</p>
							<button onClick={() => setCalendarIsOpen((value) => !value)} className={styles.dateValue}>
								{constructDateRangeString()}
							</button>
							{calendarIsOpen && (
								<DateRange color="red" className={styles.calendar} ranges={[dateRange]} onChange={onDateRangeChange} />
							)}
						</div>
					</div>
				</div>
				<div className={cn(styles.diagrams, styles.diagramsMobile, { [styles.diagramsPie]: chartType == 'pie' })}>
					{operations.length && chart}
				</div>
				<div className={styles.operations}>
					<h2 className={styles.operationsTitle}>Ваши введенные доходы и расходы:</h2>
					<div className={styles.operationsCards}>
						{operations.length ? (
							operations.map((o) => <OperationCard key={o.id} data={o} />)
						) : (
							<p className={styles.emptyMessage}>{'Тут пусто :('}</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

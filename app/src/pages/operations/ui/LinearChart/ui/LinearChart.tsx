import { OperationType, useOperationStore } from '@/entities/operation';
import dayjs from 'dayjs';
import { useCallback, type JSX } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
	type: OperationType;
}

export const LinearChart = ({ type }: Props): JSX.Element => {
	const operations = useOperationStore((state) => state.operations);

	const getLineChartData = useCallback(
		(type: OperationType): { name: string; value: number }[] => {
			const result = [];
			const sortedArray = operations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

			for (let i = 0; i < sortedArray.length; i++) {
				const el = sortedArray[i];
				if (el.category.type !== type) {
					continue;
				}
				while (true) {
					const nextEl = sortedArray[i + 1];
					if (!nextEl || !dayjs(nextEl.date).isSame(new Date(el.date), 'day') || nextEl.category.type !== type) {
						break;
					}
					el.amount += nextEl.amount;
					++i;
				}
				result.push({ name: dayjs(el.date).format('DD.MM'), value: el.amount });
			}
			return result;
		},
		[operations]
	);
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={getLineChartData(type)}>
				<CartesianGrid strokeDasharray="100 1" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Line
					name={type == OperationType.INCOME ? 'Доход' : 'Расход'}
					type="bump"
					dataKey="value"
					stroke={type == OperationType.INCOME ? '#6EFF6E' : '#FF6E6E'}
					strokeWidth={2}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

import { OperationType, useOperationStore } from '@/entities/operation';
import { useMemo, type JSX } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
	type: OperationType;
}

export const PieOperationsChart = ({ type }: Props): JSX.Element => {
	const operations = useOperationStore((state) => state.operations);

	const data = useMemo(() => {
		const result = [];
		const sortedArray = operations.sort((a, b) => a.category.name.localeCompare(b.category.name));

		for (let i = 0; i < sortedArray.length; i++) {
			const el = sortedArray[i];
			if (el.category.type !== type) {
				continue;
			}
			while (true) {
				const nextEl = sortedArray[i + 1];
				if (!nextEl || nextEl.categoryId !== el.categoryId || nextEl.category.type !== type) {
					break;
				}
				el.amount += nextEl.amount;
				++i;
			}
			result.push({ name: el.category.name, value: el.amount });
		}
		return result;
	}, [operations, type]);

	return (
		<ResponsiveContainer width="50%" height={300}>
			<PieChart>
				<Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="red" label>
					{data.map((el) => (
						<Cell key={el.name} fill={'#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</ResponsiveContainer>
	);
};

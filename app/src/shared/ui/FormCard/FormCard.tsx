import type { HTMLAttributes, JSX, ReactNode } from 'react';
import styles from './FormCard.module.css';
import cn from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	title: string;
}

export const FormCard = ({ className, title, children, ...props }: Props): JSX.Element => {
	return (
		<div className={cn(className, styles.formCard)} {...props}>
			<h2 className={styles.title}>{title}</h2>
			{children}
		</div>
	);
};

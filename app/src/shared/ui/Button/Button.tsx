import { type ButtonHTMLAttributes, type JSX, type ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const Button = ({ className, children }: Props): JSX.Element => {
	return <button className={cn(className, styles.button)}>{children}</button>;
};

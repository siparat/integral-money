import { forwardRef, type ButtonHTMLAttributes, type ForwardedRef, type ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const Button = forwardRef(({ className, children, ...props }: Props, ref: ForwardedRef<HTMLButtonElement>) => (
	<button ref={ref} className={cn(className, styles.button)} {...props}>
		{children}
	</button>
));

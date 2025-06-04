import { forwardRef, type ForwardedRef, type HTMLInputTypeAttribute, type InputHTMLAttributes, type JSX } from 'react';
import cn from 'classnames';
import styles from './Input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	type?: Extract<HTMLInputTypeAttribute, 'email' | 'number' | 'password' | 'tel' | 'text'>;
	label?: string;
	error?: string;
}

export const Input = forwardRef(
	({ className, id, error, label, type = 'text', ...props }: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
		const inputElement = <input ref={ref} type={type} className={cn(styles.input, { [className || '']: !!label })} {...props} />;
		if (!label) {
			return inputElement;
		}

		return (
			<div className={className}>
				<label className={styles.label} htmlFor={id}>
					{label}
				</label>
				{inputElement}
				{error && <p className={styles.error}>{error}</p>}
			</div>
		);
	}
);

import type { JSX, MenuHTMLAttributes } from 'react';
import styles from './HeaderMenu.module.css';
import { headerMenu } from '../model/config';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const HeaderMenu = ({ className, ...props }: MenuHTMLAttributes<HTMLMenuElement>): JSX.Element => {
	return (
		<menu className={cn(className, styles.menu)} {...props}>
			<ul>
				{headerMenu.map(({ label, path }) => (
					<li key={path}>
						<NavLink className={styles.link} to={path}>
							{label}
						</NavLink>
					</li>
				))}
			</ul>
		</menu>
	);
};

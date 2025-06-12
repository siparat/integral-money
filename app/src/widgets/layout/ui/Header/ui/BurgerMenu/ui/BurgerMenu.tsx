import type { JSX, MouseEvent } from 'react';
import styles from './BurgerMenu.module.css';
import { HeaderActions } from '../../HeaderActions/ui/HeaderActions';
import { HeaderMenu } from '../../HeaderMenu/ui/HeaderMenu';

interface Props {
	close: () => void;
}

export const BurgerMenu = ({ close }: Props): JSX.Element => {
	const onOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
		const target = e.target as HTMLDivElement;
		if (target.isEqualNode(e.currentTarget) || target.tagName == 'A') {
			close();
		}
	};

	return (
		<div onClick={onOverlayClick} className={styles.overlay}>
			<div className={styles.menu}>
				<HeaderMenu />
				<HeaderActions />
			</div>
		</div>
	);
};

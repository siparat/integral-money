import { Routes, type NavItem } from '@/shared';

export const headerMenu: NavItem[] = [
	{
		label: 'Главная',
		path: Routes.MAIN
	},
	{
		label: 'Постоянные расходы',
		path: Routes.FIXED_COSTS
	},
	{
		label: 'Помощь',
		path: Routes.HELP
	},
	{
		label: 'Найти специалиста',
		path: Routes.ORDER_SERVICE
	},
	{
		label: 'Подписки',
		path: Routes.SUBSCRIBES
	}
];

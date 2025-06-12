import { create } from 'zustand';
import { LocalStorageKeys } from '../config';

interface ThemeStore {
	appearance: 'dark' | 'light';
	switchTheme(): void;
}

const getDefaultAppearance = (): ThemeStore['appearance'] => {
	try {
		const storageAppearance = localStorage.getItem(LocalStorageKeys.THEME);
		if (!storageAppearance) {
			const appearance = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
			localStorage.setItem(LocalStorageKeys.THEME, appearance);
			return appearance;
		}
		if (['dark', 'light'].includes(storageAppearance)) {
			return storageAppearance as ThemeStore['appearance'];
		}
		return 'light';
	} catch (e) {
		console.error(e);
		return 'light';
	} finally {
		const theme = localStorage.getItem(LocalStorageKeys.THEME) as ThemeStore['appearance'];
		document.documentElement.dataset.theme = theme;
	}
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
	appearance: getDefaultAppearance(),
	switchTheme: (): void => {
		const appearance = get().appearance == 'dark' ? 'light' : 'dark';
		set({ appearance });
		localStorage.setItem(LocalStorageKeys.THEME, appearance);
		document.documentElement.dataset.theme = appearance;
	}
}));

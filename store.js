import { create } from 'zustand';

const authStore = create((set) => ({
	isAuthenticated:
		typeof window !== 'undefined'
			? window.localStorage.getItem('courseAuthenticated')
			: false,
	token:
		typeof window !== 'undefined'
			? window.localStorage.getItem('courseToken')
			: null,
	user:
		typeof window !== 'undefined'
			? JSON.parse(window.localStorage.getItem('courseUser'))
			: null,
	login: (state) => {
		set(() => ({
			isAuthenticated: true,
			user: state.data,
			token: state.token,
		}));

		localStorage.setItem('courseAuthenticated', true);
		localStorage.setItem('courseUser', JSON.stringify(state.data));
		localStorage.setItem('courseToken', state.token);
	},
	logout: () =>
		set(() => {
			localStorage.removeItem('courseAuthenticated');
			localStorage.removeItem('courseToken');
			localStorage.removeItem('courseUser');

			window.location.href = '/';
		}),
}));

export default authStore;

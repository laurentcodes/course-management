import '@/styles/globals.css';

import authStore from '@/store';

export default function App({ Component, pageProps }) {
	const isAuthenticated = authStore((state) => state.user);
	const user = authStore((state) => state.user);
	const logout = authStore((state) => state.logout);

	return (
		<>
			<header className='flex justify-between p-6 bg-[#1d2d44] text-white'>
				<h2 className='text-2xl fontbo'>C0urse</h2>

				{isAuthenticated && (
					<div className='flex gap-6'>
						<p>{user.name}</p>

						<p className='cursor-pointer' onClick={logout}>
							Logout
						</p>
					</div>
				)}
			</header>
			<section className='p-8 flex justify-center items-center'>
				<Component {...pageProps} />
			</section>
		</>
	);
}

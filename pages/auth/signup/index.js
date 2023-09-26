'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { signUp } from '@/pages/api/services';

import authStore from '@/store';

export default function Login() {
	const router = useRouter();

	const login = authStore((state) => state.login);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [type, setType] = useState('student');

	const onSubmit = (e) => {
		e.preventDefault();

		signUp({ name, email, password, type })
			.then((res) => {
				login(res);

				toast.success('Welcome!', {
					position: toast.POSITION.TOP_RIGHT,
				});

				router.push('/');
			})
			.catch((err) => {
				toast.error('Error', {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};

	return (
		<form className='w-screen md:w-96 p-5 md:p-0' onSubmit={onSubmit}>
			<h3 className='font-bold text-3xl my-6'>Sign Up</h3>

			<div className='mb-6 w-full'>
				<label
					htmlFor='name'
					className='block mb-2 text-sm font-medium text-gray-900 '
				>
					Name
				</label>
				<input
					type='name'
					id='name'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full p-2.5'
					placeholder='Enter Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>

			<div className='mb-6 w-full'>
				<label
					htmlFor='email'
					className='block mb-2 text-sm font-medium text-gray-900 '
				>
					Email
				</label>
				<input
					type='email'
					id='email'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full p-2.5'
					placeholder='Enter Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>

			<div className='mb-6 w-full'>
				<label
					htmlFor='password'
					className='block mb-2 text-sm font-medium text-gray-900 '
				>
					Password
				</label>
				<input
					type='password'
					id='password'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full p-2.5'
					placeholder='Enter Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>

			<div className='mb-6 w-full'>
				<label
					htmlFor='type'
					className='block mb-2 text-sm font-medium text-gray-900 '
				>
					User Type
				</label>
				<select
					id='type'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full p-2.5'
					value={type}
					onChange={(e) => setType(e.target.value)}
				>
					<option value='student'>Student</option>
					<option value='tutor'>Tutor</option>
				</select>
			</div>

			<button className='bg-[#1d2d44] w-full p-2 text-white rounded-lg'>
				Sign Up
			</button>

			<p
				className='text-center text-sky-500 my-3 cursor-pointer'
				onClick={() => router.push('/auth/login')}
			>
				Already have an account? Sign In
			</p>
		</form>
	);
}

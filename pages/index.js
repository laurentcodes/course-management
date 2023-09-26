'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import authStore from '../store';

import {
	getCourses,
	getTutorCourses,
	getStudentCourses,
	createCourse,
	enrollStudent,
	unEnrollStudent,
} from './api/services';

export default function Home() {
	const router = useRouter();

	const [courses, setCourses] = useState([]);
	const [tutorCourses, setTutorCourses] = useState([]);
	const [studentCourses, setStudentCourses] = useState([]);

	const [title, setTitle] = useState('');
	const [code, setCode] = useState('');
	const [description, setDescription] = useState('');

	const [enroll, setEnroll] = useState('');

	const isAuthenticated = authStore((state) => state.isAuthenticated);
	const user = authStore((state) => state.user);

	useEffect(() => {
		if (!isAuthenticated && user === null) router.push('/auth/login');

		getCourses()
			.then((res) => {
				setCourses(res.data);
			})
			.catch((err) => console.log(err));

		const id = setInterval(() => {
			getTutorCourses()
				.then((res) => {
					setTutorCourses(res.data);
				})
				.catch((err) => console.log(err));

			getStudentCourses()
				.then((res) => {
					setStudentCourses(res.data);
				})
				.catch((err) => console.log(err));
		}, 3000);

		return () => clearInterval(id);
	}, [isAuthenticated]);

	const onSubmit = (e) => {
		e.preventDefault();

		createCourse({ title, code, description })
			.then((res) => {
				toast.success(res.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.catch((err) => {
				toast.error(err.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};

	const onSubmitEnroll = (e) => {
		e.preventDefault();

		enrollStudent({ id: enroll })
			.then((res) => {
				toast.success(res.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.catch((err) => {
				console.log(err);

				toast.error('You have already enrolled for this course.', {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};

	const onSubmitUnEnroll = (value) => {
		unEnrollStudent({ id: value })
			.then((res) => {
				toast.success(res.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};

	return (
		<div className='flex w-full flex-col md:flex-row justify-between'>
			{user?.type === 'tutor' ? (
				<main className='flex w-full flex-col md:flex-row justify-between'>
					<div className='basis-1/2'>
						<h2 className='font-bold text-2xl'>Courses</h2>

						{tutorCourses &&
							tutorCourses.map((course) => (
								<div
									key={course._id}
									className='border-2 py-2 px-4 my-2 rounded-lg border-[#748cab] w-full md:w-56'
								>
									<p className='font-bold'>
										{course.code} - {course.title}
									</p>

									<p>{course.description}</p>
								</div>
							))}
					</div>

					<div className='mt-12 md:mt-0 text-left basis-1/2'>
						<h2 className='font-bold text-2xl text-left my-3'>
							Create New Course
						</h2>

						<form onSubmit={onSubmit}>
							<div className='mb-6 w-96'>
								<label
									htmlFor='title'
									className='block mb-2 text-sm font-medium text-gray-900 '
								>
									Title
								</label>
								<input
									type='title'
									id='title'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full p-2.5'
									placeholder='Enter Title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
								/>
							</div>

							<div className='mb-6 w-96'>
								<label
									htmlFor='code'
									className='block mb-2 text-sm font-medium text-gray-900 '
								>
									Code
								</label>
								<input
									type='code'
									id='code'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full p-2.5'
									placeholder='Enter Code'
									value={code}
									onChange={(e) => setCode(e.target.value)}
									required
								/>
							</div>

							<div className='mb-6 w-96'>
								<label
									htmlFor='description'
									className='block mb-2 text-sm font-medium text-gray-900 '
								>
									Description
								</label>
								<input
									type='description'
									id='description'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full p-2.5'
									placeholder='Enter Description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>
							</div>

							<button className='bg-[#3e5c76] w-full md:w-96 p-2 text-white rounded-lg'>
								Create
							</button>
						</form>
					</div>
				</main>
			) : (
				<main className='flex w-full flex-col md:flex-row justify-between'>
					{/* <div className='flex gap-4'> */}
					{/* <div className='basis-1/2'>
							<h2 className='font-bold text-2xl'>Available Courses</h2>

							{courses &&
								courses.map((course) => (
									<div
										key={course._id}
										className='border-2 py-2 px-4 my-2 rounded-lg border-[#748cab] w-full md:w-56'
									>
										<p className='font-bold'>
											{course.code} - {course.title}
										</p>

										<p>{course.description}</p>
									</div>
								))}
						</div> */}

					<div className='basis-1/2'>
						<h2 className='font-bold text-2xl'>Enrolled Courses</h2>

						{studentCourses &&
							studentCourses.map((course) => (
								<div
									key={course._id}
									className='border-2 py-2 px-4 my-2 rounded-lg border-[#748cab] w-full md:w-96'
								>
									<p className='font-bold'>
										{course.code} - {course.title}
									</p>

									<p>{course.description}</p>

									<p className='text-[#748cab] font-bold'>
										Tutor: {course.tutor.name}
									</p>

									<button
										className='bg-red-500 text-white py-1 px-3 my-1 rounded-lg w-full md:w-1/2'
										onClick={() => onSubmitUnEnroll(course._id)}
									>
										Remove
									</button>
								</div>
							))}
					</div>
					{/* </div> */}

					<div className='mt-12 md:mt-0 text-left basis-1/2'>
						<h2 className='font-bold text-2xl text-left my-3'>
							Enroll to Course
						</h2>

						<form onSubmit={onSubmitEnroll}>
							<div className='mb-6 w-full'>
								<label
									htmlFor='type'
									className='block mb-2 text-sm font-medium text-gray-900 '
								>
									Course
								</label>
								<select
									id='type'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-600 block w-full md:w-96 p-2.5'
									value={enroll}
									onChange={(e) => setEnroll(e.target.value)}
								>
									<option key='' value=''>
										Select Course
									</option>
									{courses.map((course) => (
										<option key={course._id} value={course._id}>
											{course.code} - {course.title}
										</option>
									))}
								</select>
							</div>

							<button className='bg-[#3e5c76] w-full md:w-96 p-2 text-white rounded-lg'>
								Enroll
							</button>
						</form>
					</div>
				</main>
			)}
		</div>
	);
}

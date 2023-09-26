'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import authStore from '../store';

import TutorPage from '@/components/TutorPage';
import StudentPage from '@/components/StudentPage';

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

	const [clientMounted, setClientMounted] = useState(false);

	const [courses, setCourses] = useState([]);
	const [tutorCourses, setTutorCourses] = useState([]);
	const [studentCourses, setStudentCourses] = useState([]);
	const [loading, setLoading] = useState(false);

	const [title, setTitle] = useState('');
	const [code, setCode] = useState('');
	const [description, setDescription] = useState('');

	const [enroll, setEnroll] = useState('');

	const isAuthenticated = authStore((state) => state.isAuthenticated);
	const user = authStore((state) => state.user);

	useEffect(() => {
		setClientMounted(true);
	}, []);

	useEffect(() => {
		if (!isAuthenticated && user === null) {
			setLoading(true);

			const redirectTimer = setTimeout(() => {
				router.push('/auth/login');
			}, 1000);

			return () => {
				clearTimeout(redirectTimer);
			};
		} else {
			setLoading(false);
		}

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

		return () => {
			clearInterval(id);
		};
	}, [isAuthenticated, router, user]);

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

	if (loading)
		return (
			<div className='flex justify-center items-center h-[calc(100vh-200px)]'>
				<span className='animate-ping absolute h-16 w-16 rounded-full bg-[#1d2d44]'></span>
			</div>
		);

	return (
		<div className='flex w-full flex-col md:flex-row justify-between'>
			{clientMounted && user?.type === 'tutor' ? (
				<TutorPage
					data={tutorCourses}
					onSubmit={onSubmit}
					title={title}
					setTitle={setTitle}
					code={code}
					setCode={setCode}
					description={description}
					setDescription={setDescription}
				/>
			) : (
				<StudentPage
					data={studentCourses}
					enroll={enroll}
					setEnroll={setEnroll}
					onSubmitEnroll={onSubmitEnroll}
					onSubmitUnEnroll={onSubmitUnEnroll}
					courses={courses}
				/>
			)}
		</div>
	);
}

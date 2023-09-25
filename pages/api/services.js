import axios from 'axios';

axios.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('courseToken');

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// USERS
export const signIn = async (value) => {
	const { data } = await axios.post('/api/login', value);

	return data;
};

export const signUp = async (value) => {
	const { data } = await axios.post('/api/signup', value);

	return data;
};

// COURSES
export const getCourses = async () => {
	const { data } = await axios.get('/api/all-courses');

	return data;
};

export const getTutorCourses = async () => {
	const { data } = await axios.get('/api/courses');

	return data;
};

export const createCourse = async (value) => {
	const { data } = await axios.post('/api/courses', value);

	return data;
};

// STUDENTS
export const getStudentCourses = async () => {
	const { data } = await axios.get('/api/students');

	return data;
};

export const enrollStudent = async (value) => {
	const { data } = await axios.post('/api/students', value);

	return data;
};

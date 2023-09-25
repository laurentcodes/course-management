const jwt = require('jsonwebtoken');

const connectDB = require('../../config/db');

import { CustomError } from '../../utils/customError';

const Course = require('./models/Course');
const User = require('./models/User');

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { id } = req.body;

	if (method === 'GET') {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				token = req.headers.authorization.split(' ')[1];

				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				const user = await User.findById(decoded.id).select('-password');

				const courseIds = user.courses;

				const courses = await Course.find({
					_id: { $in: courseIds },
				});

				res.status(200).json({ data: courses, total: courses.length });
			} catch (err) {
				res.status(500).send({
					message: err.message || 'Server Error',
					code: err.code || 500,
				});
			}
		}
	} else if (method === 'POST') {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				token = req.headers.authorization.split(' ')[1];

				const decoded = jwt.verify(token, process.env.JWT_SECRET);

				const user = await User.findById(decoded.id).select('-password');

				if (user.type !== 'student') {
					throw new CustomError(
						'Error',
						400,
						'Only Students can enroll to Courses.'
					);
				}

				let course = await Course.findById(id);

				if (!course) {
					throw new CustomError('Error', 400, 'This Course Does not Exist.');
				}

				if (user.courses.includes(id)) {
					throw new CustomError(
						'Error',
						400,
						'This Course has already been Enrolled.'
					);
				}

				user.courses.push(id);

				await user.save();

				res.status(201).json({
					status: res.statusCode,
					message: 'Course Enrolled Successfully!',
				});
			} catch (err) {
				res.status(500).send({
					message: err.message || 'Server Error',
					code: err.code || 500,
				});
			}
		}
	} else {
		res.status(405).send({ message: 'Invalid' });
	}
};

export default handler;

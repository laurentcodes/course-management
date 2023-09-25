const jwt = require('jsonwebtoken');

const connectDB = require('../../config/db');

import { CustomError } from '../../utils/customError';

const Course = require('./models/Course');
const User = require('./models/User');

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { title, code, description } = req.body;

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

				const courses = await Course.find({ tutor: user._id });

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

				if (user.type !== 'tutor') {
					throw new CustomError(
						'Error',
						400,
						'Only Tutors can create Courses.'
					);
				}

				let course = await Course.findOne({ code });

				if (course) {
					throw new CustomError('Error', 400, 'This Course Exists Already.');
				}

				course = new Course({
					title,
					code,
					description,
					tutor: user._id,
				});

				await course.save();

				res.status(201).json({
					data: { title, code, description, tutor: user.name },
					status: res.statusCode,
					message: 'Course Created Successfully!',
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

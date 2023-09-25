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
		try {
			const count = await Course.countDocuments();

			let courses = await Course.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'tutor',
						foreignField: '_id',
						as: 'tutor',
					},
				},
				{ $unwind: '$tutor' },
				{
					$project: {
						_id: 1,
						title: 1,
						code: 1,
						description: 1,
						'tutor._id': 1,
						'tutor.name': 1,
						'tutor.email': 1,
					},
				},
			]).exec();

			res.status(200).json({ data: courses, total: count });
		} catch (err) {
			res.status(500).send({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else {
		res.status(405).send({ message: 'Invalid' });
	}
};

export default handler;

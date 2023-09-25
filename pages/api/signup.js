import generateToken from '@/utils/generateToken';

const connectDB = require('../../config/db');

import { CustomError } from '../../utils/customError';

const User = require('./models/User');

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { name, email, password, type } = req.body;

	if (method === 'POST') {
		try {
			const userExists = await User.findOne({ email });

			if (userExists) {
				throw new CustomError('Error', 400, 'User Already Exists.');
			}

			const user = await User.create({
				name,
				email,
				password,
				type,
			});

			res.status(201).json({
				data: {
					_id: user._id,
					name: user.name,
					email: user.email,
					type: user.type,
				},
				token: generateToken(user._id),
				status: res.statusCode,
				message: 'User Created Successfully',
			});
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

import generateToken from '@/utils/generateToken';

const connectDB = require('../../config/db');

import { CustomError } from '../../utils/customError';

const User = require('./models/User');

// Connect database
connectDB();

const handler = async (req, res) => {
	const { method } = req;

	const { email, password } = req.body;

	if (method === 'POST') {
		try {
			const user = await User.findOne({ email });

			if (user && (await user.matchPassword(password))) {
				res.status(201).json({
					data: {
						_id: user._id,
						name: user.name,
						email: user.email,
						type: user.type,
					},
					token: generateToken(user._id),
					status: res.statusCode,
				});
			} else {
				throw new CustomError('Error', 401, 'Invalid email and password.');
			}
		} catch (err) {
			res.status(500).json({
				message: err.message || 'Server Error',
				code: err.code || 500,
			});
		}
	} else {
		res.status(405).send({ message: 'Invalid' });
	}
};

export default handler;

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	tutor: {
		type: ObjectId,
		ref: 'users',
		required: true,
	},
});

module.exports =
	mongoose.models.course || mongoose.model('course', courseSchema);

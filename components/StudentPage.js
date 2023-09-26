import React from 'react';

const StudentPage = ({
	data,
	courses,
	enroll,
	setEnroll,
	onSubmitEnroll,
	onSubmitUnEnroll,
}) => {
	return (
		<main className='flex w-full flex-col md:flex-row justify-between'>
			<div className='basis-1/2'>
				<h2 className='font-bold text-2xl'>Enrolled Courses</h2>

				{data &&
					data.map((course) => (
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
				<h2 className='font-bold text-2xl text-left my-3'>Enroll to Course</h2>

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
	);
};

export default StudentPage;

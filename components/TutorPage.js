const TutorPage = ({
	data,
	onSubmit,
	title,
	setTitle,
	code,
	setCode,
	description,
	setDescription,
}) => {
	return (
		<main className='flex w-full flex-col md:flex-row justify-between'>
			<div className='basis-1/2'>
				<h2 className='font-bold text-2xl'>Courses</h2>

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
						</div>
					))}
			</div>

			<div className='mt-12 md:mt-0 text-left basis-1/2'>
				<h2 className='font-bold text-2xl text-left my-3'>Create New Course</h2>

				<form onSubmit={onSubmit}>
					<div className='mb-6 w-full md:w-96'>
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

					<div className='mb-6 w-full md:w-96'>
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

					<div className='mb-6 w-full md:w-96'>
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
	);
};

export default TutorPage;

import { useEffect, useState } from 'react';

export const DefaultRender = ({ errorMessage, counter, time }) => {
	const [Message, setError] = useState('');
	const [timer, setTimer] = useState(4000);
	const [errorCount, setErrorCount] = useState(0);

	useEffect(() => {
		setErrorCount(counter);
		setError(errorMessage);
		setTimer(time);
		setTimeout(function () {
			setError('');
		}, 4000);
	}, [counter, errorMessage, errorCount]);

	return Message ? (
		<div className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 text-[#FF0000]'>
			<p className='mt-auto'>{Message}</p>
		</div>
	) : (
		<div />
	);
};

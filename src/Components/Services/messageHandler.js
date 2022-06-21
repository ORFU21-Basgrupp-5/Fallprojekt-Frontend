import { useEffect, useState } from 'react';

export const DefaultRender = ({ errorMessage, counter, time }) => {
  const [Message, setError] = useState("");
  const [timer, setTimer] = useState(4000);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setErrorCount(counter);
    setError(errorMessage);
    setTimer(time);
    console.log('Error Count ' + errorCount);
    setTimeout(function () {
      setError("")
    }, 4000);
  }, [counter, errorMessage, errorCount]);

	return Message ? (
		<div className='h-auto max-h-20 max-w-xl p-7 absolute text-center  left-0 right-0 top-0 bottom-0 m-auto bg-white  rounded-xl shadow-black shadow-xl font-bold border-red-800 border-2 text-[#FF0000]'>
			<p className='mt-auto'>{Message}</p>
		</div>
	) : (
		<div />
	);
};

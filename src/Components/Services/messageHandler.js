import { useEffect, useState } from 'react';

export const DefaultRender = ({ errorMessage, counter, timer }) => {
  const [Message, setError] = useState("");
  const [time, setTime] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setErrorCount(counter);
    setError(errorMessage);
    setTime(timer);
    console.log('Error Count ' + errorCount);
    setTimeout(function () {
      setError("")
    }, time);
  }, [counter, errorMessage, time, errorCount]);


  return (
    <div id='popup'>
      {Message !== "" && <p className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 text-[#FF0000]">{Message}</p>}
    </div>

  );
}
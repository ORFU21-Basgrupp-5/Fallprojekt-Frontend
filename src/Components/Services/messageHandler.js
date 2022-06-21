import { useEffect, useState } from 'react';

export const DefaultRender = ({ errorMessage, counter, time }) => {
  const [Message, setError] = useState("");
  const [timer, setTimer] = useState(4000);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    debugger;
    setErrorCount(counter);
    setError(errorMessage);
    setTimer(time);
    console.log('Error Count ' + errorCount);
    setTimeout(function () {
      setError("")
    }, 4000);
  }, [counter, errorMessage, errorCount]);


  return (
    <div id='popup'>
      {Message !== "" && <p className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 text-[#FF0000]">{Message}</p>}
    </div>

  );
}
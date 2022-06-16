import { useEffect, useState } from 'react';

export const DefaultRender = ({errorMessage}) => {
  const [Message, setError] = useState("");
  const time = 4000;

  useEffect(() => {
    setError(errorMessage)
    
    let timer = setTimeout(function () {
      setError("")
  }, time);
  }, [errorMessage]);


  return (
    <div id='popup'>
     {Message !== "" && <p className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 text-[#FF0000]">{Message}</p>}
    </div>
    
  );
}
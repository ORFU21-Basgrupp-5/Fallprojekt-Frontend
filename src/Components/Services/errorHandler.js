import { useEffect, useState } from 'react';

export const DefaultRender = ({errorMessage}) => {
  const [Message, setError] = useState("");
  useEffect(() => {
    setError(errorMessage)

    setTimeout(function () {
      setError("")
  }, 4000)
  }, [errorMessage]);


  return (
    <div>
      <p>{Message}</p>
    </div>
  );
}
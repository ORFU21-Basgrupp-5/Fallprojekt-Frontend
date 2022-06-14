import { useState } from 'react';

export const DefaultRender = ({errorMessage}) => {
  const [Message, setError] = useState("");
  // setError(msg)
  return (
    <div>
      <p>{errorMessage}</p>
    </div>
  );

  // const errorDiv = document.getElementById("errorDiv")
  // const childErrorDiv = document.createElement("div")
  // childErrorDiv.insertAdjacentText("beforeend", msg)
  // errorDiv.appendChild(childErrorDiv)
  // setTimeout(function () {
  //   errorDiv.removeChild(errorDiv.lastChild);
  // }, 4000)
}

import React, { useState } from 'react';

const [message, setMessage] = useState("");
const errorDiv = document.getElementById("errorDiv");
export const DefaultRender = function (msg) {
  message = setMessage(msg);

  return (
    <div id={errorDiv}>
      <div>
        <p>{msg}</p>
      </div>
    </div>
  )
}
setTimeout(function () {
  errorDiv.removeChild(errorDiv.lastChild);
}, 4000);
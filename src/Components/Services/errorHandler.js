import React, { useState } from 'react';

const [message, setMessage] = useState("");

export const DefaultRender = function (msg) {
  message = setMessage(msg);
  return (
    <div id="errorDiv">
      <div>
        <p>{msg}</p>
      </div>
    </div>
  )
}
setTimeout(function () {
  errorDiv;
}, 4000);


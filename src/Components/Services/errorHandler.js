import React, { useState } from 'react';

const [message, setMessage] = useState("");

export const DefaultRender = function (msg) {
  const errorDiv = document.getElementById("errorDiv");
  message = setMessage(msg);

  <div id="child">
    <p>Hello</p>
  </div>

  errorDiv.appendChild("child");

  setTimeout(function () {
    errorDiv.removeChild(errorDiv.lastChild);
  }, 4000);
}

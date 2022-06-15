import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import AuthProvider from './Components/Services/AuthProvider.js';
import { StrictMode } from "react";
import { BrowserRouter} from 'react-router-dom';

//StrickMode is now on.
//Quick FaQ :
//StrictMode currently helps with:
/////////////////////////////////////////////////
// Identifying components with unsafe lifecycles
// Warning about legacy string ref API usage
// Warning about deprecated findDOMNode usage
// Detecting unexpected side effects
// Detecting legacy context API
// Ensuring reusable state
///////////////////////////////////////////////
// this will make it easier to spot issues.

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
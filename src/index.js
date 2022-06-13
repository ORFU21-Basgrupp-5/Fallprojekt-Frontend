import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App.js';
import AuthProvider from './Components/Services/AuthProvider.js';
import { StrictMode } from "react";
import { BrowserRouter} from 'react-router-dom';


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
import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
	rootElement
);

reportWebVitals();

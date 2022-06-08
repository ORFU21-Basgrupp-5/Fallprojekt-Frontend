import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/User/LoginComponent.js';
import Register from './Components/User/RegisterUserComponent.js'
import ChangePassword from './Components/User/ChangePasswordComponent.js';
import RecoverEmail from './Components/User/RecoveryEmailComponent.js';
import GetBudget from './Components/Budget/GetBudgetComponent';
import Budget from './Components/Budget/BudgetComponent';
import AddBalanceChange from './Components/Budget/AddBalanceChangeComponent';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<RecoverEmail />} />
      <Route path="/addbalancechange" element={<AddBalanceChange />}/>
      <Route path="/getbudget" element={<GetBudget />}/>     
      <Route path="/addbudget" element={<Budget />}/>    
      {/* <Route path="/changePassword" element={<ChangePassword />} /> */}
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

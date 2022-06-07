import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/User/LoginComponent';
import ChangePasswordComponent from './Components/User/ChangePasswordComponent';
import RecoveryEmailComponent from './Components/User/RecoveryEmailComponent';
import GetBudgetComponent from './Components/Budget/GetBudgetComponent';
import BudgetComponent from './Components/Budget/BudgetComponent';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}/>
              <Route path="/login" element={<Login />}/>
              {/* <Route path="/register" element={<Register/>}/> */}
              {/* <Route path="changePassword" element={<ChangePasswordComponent />}/> */}
              {/* <Route path="AddBalanceChange" element={<AddBalanceChangeComponent />}/> */}
              {/* <Route path="recoveryEmail" element={<RecoveryEmailComponent />}/> */}
              {/* <Route path="getBudget" element={<GetBudgetComponent />}/>      */}
              {/* <Route path="listBudget" element={<listBudgetComponent />}/>      */}
              {/* <Route path="budget" element={<BudgetComponent />}/>         */}
          
        </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

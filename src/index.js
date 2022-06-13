import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/User/LoginComponent.js';
import Register from './Components/User/RegisterUserComponent.js';
import ChangePassword from './Components/User/ChangePasswordComponent.js';
import RecoverEmail from './Components/User/RecoveryEmailComponent.js';
import GetBudget from './Components/Budget/GetBudgetComponent';
import Home from './Components/home.js';
import Budget from './Components/Budget/BudgetComponent';
import AddBalanceChange from './Components/Budget/AddBalanceChangeComponent';
import History from './Components/Budget/HistoryComponent.js'
import Welcome from './Components/User/WelcomeComponent';

const rootElement = document.getElementById('root');
ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route index element={<Home />} />
				<Route exact path='/welcome' element={<Welcome />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/register' element={<Register />} />
				<Route exact path='/recover' element={<RecoverEmail />} />
				<Route exact path='/addbalancechange' element={<AddBalanceChange />} />
				<Route exact path='/GetBudget' element={<GetBudget />} />
				<Route exact path='/addbudget' element={<Budget />} />
				<Route exact path='/History' element={<History />} />
        		<Route path="/changePassword" element={<ChangePassword />} />
			</Route>

		</Routes>
	</BrowserRouter>,
	rootElement
);



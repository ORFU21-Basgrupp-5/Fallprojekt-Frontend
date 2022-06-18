import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './Services/AuthProvider.js';
import { GetCookie, DeleteCookie } from './Services/cookie';
const NavigationBar = () => {
	const { loginStatus, setLoginStatus } = useAuth();
	const forceLogout = () => {
		//will remove cookie and set auth context to false, aka not loged in.
		DeleteCookie('token');
		setLoginStatus({status:false,user:''});
	};
	if (loginStatus.status === true) {
		return (
			<div className='menu-wrapper'>
				<div className='mainLogo'>BudgetFix</div>

				<NavLink to='/' className='menu-btn'>
					Home
				</NavLink>
				<NavLink to='/about' className='menu-btn'>
					About
				</NavLink>
				<NavLink to='/contact' className='menu-btn'>
					Contact
				</NavLink>
				<NavLink to='/addbalancechange' className='menu-btn'>
					Inmatning
				</NavLink>

				<NavLink to='/History' className='menu-btn'>
					History
				</NavLink>

				<NavLink to='/addbudget' className='menu-btn'>
					Skapa Budget
				</NavLink>

				<NavLink to='/getbudget' className='menu-btn'>
					Visa Budget
				</NavLink>

				<NavLink to='/' onClick={forceLogout} className='menu-login-btn'>
					Logout
				</NavLink>
			</div>
		);
	} else {
		return (
			<div className='menu-wrapper'>
				<div className='mainLogo'>BudgetFix</div>
				<NavLink to='/' className='menu-btn'>
					Home
				</NavLink>
				<NavLink to='/about' className='menu-btn'>
					About
				</NavLink>
				<NavLink to='/contact' className='menu-btn'>
					Contact
				</NavLink>

				<NavLink to='/login' className='menu-login-btn'>
					Login
				</NavLink>
				<NavLink to='/registeruser' className='menu-reg-btn'>
					Start Saving
				</NavLink>
			</div>
		);
	}
};

export default NavigationBar;

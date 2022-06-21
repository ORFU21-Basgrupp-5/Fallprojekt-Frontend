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
					Hem
				</NavLink>
				<NavLink to='/about' className='menu-btn'>
					Om oss
				</NavLink>
				<NavLink to='/contact' className='menu-btn'>
					Kontakt
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
					Logga ut
				</NavLink>
			</div>
		);
	} else {
		return (
			<div className='menu-wrapper'>
				<div className='mainLogo'>BudgetFix</div>
				<NavLink to='/' className='menu-btn'>
					Hem
				</NavLink>
				<NavLink to='/about' className='menu-btn'>
					Om oss
				</NavLink>
				<NavLink to='/contact' className='menu-btn'>
					Kontakt
				</NavLink>

				<NavLink to='/login' className='menu-login-btn'>
					Logga in
				</NavLink>
				<NavLink to='/registeruser' className='menu-reg-btn'>
					Börja spara
				</NavLink>
			</div>
		);
	}
};

export default NavigationBar;

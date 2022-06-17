import React from 'react';
import { NavLink } from 'react-router-dom';
import NavImage from '../Images/Asset_1.svg';
import { useAuth } from './Services/AuthProvider.js';
import { DeleteCookie } from './Services/cookie';
const NavigationBar = () => {
	const { loginStatus, setLoginStatus } = useAuth();
	const forceLogout = () => {
		//will remove cookie and set auth context to false, aka not loged in.
		setLoginStatus(false);
		DeleteCookie('token');
	};

	if (loginStatus === true) {
		return (
			<div className='menu-wrapper'>
						<img id='mainLogo' src={NavImage} alt='My Happy SVG' />
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
							
								<NavLink to='/' onClick={forceLogout} className='menu-btn'>
									Logout
								</NavLink>
			</div>
		);
	} else {
		return (
			<div className='menu-wrapper'>
				<img id='mainLogo' src={NavImage} alt='My Happy SVG' />
					
								<NavLink to='/login' className='menu-btn'>
									Login
								</NavLink>
							
								<NavLink to='/registeruser' className='menu-btn'>
									Registera dig
								</NavLink>
			</div>
		);
	}
};

export default NavigationBar;

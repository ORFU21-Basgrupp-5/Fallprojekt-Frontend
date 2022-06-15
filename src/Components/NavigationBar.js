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
			<div className='box-border h-32 w-32 p-4 border-4'>
				<div className='container'>
					<div id='header' className='navigation-menu'>
						<img id='mainLogo' src={NavImage} alt='My Happy SVG' />
						<ul id='navbar'>
							<li>
								<NavLink to='/addbalancechange' className='button'>
									Inmatning
								</NavLink>
							</li>
							<li>
								<NavLink to='/History' className='button'>
									History
								</NavLink>
							</li>
							<li>
								<NavLink to='/addbudget' className='button'>
									Skapa Budget
								</NavLink>
							</li>
							<li>
								<NavLink to='/getbudget' className='button'>
									Visa Budget
								</NavLink>
							</li>
							<li>
								<NavLink to='/' onClick={forceLogout} className='button'>
									Logout
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='header'>
				<div className='container'>
					<div id='header' className='navigation-menu'>
						
						<ul id='navbar'>
							<li>
								<NavLink to='/login' className='button'>
									Login
								</NavLink>
							</li>
							<li>
								<NavLink to='/registeruser' className='button'>
									Registera dig
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
};

export default NavigationBar;

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
			<div className='flex flex-row space-x-4 space-y-4 h-20'>
				<div className=''>
					<div id='header' className='navigation-menu'>
						<img id='mainLogo' src={NavImage} alt='My Happy SVG' />
						
								<NavLink to='/addbalancechange' className='text-white font-bold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded'>
									Inmatning
								</NavLink>
							
								<NavLink to='/History' className='text-white font-bold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded'>
									History
								</NavLink>
							
								<NavLink to='/addbudget' className='text-white font-bold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded'>
									Skapa Budget
								</NavLink>
							
								<NavLink to='/getbudget' className='text-white font-bold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded'>
									Visa Budget
								</NavLink>
							
								<NavLink to='/' onClick={forceLogout} className='text-white font-bold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded'>
									Logout
								</NavLink>
						
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='flex flex-row  h-10'>
				
					
						
						
								<NavLink to='/login' className='text-white font-bold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded mx-3'>
									Login
								</NavLink>
							
								<NavLink to='/registeruser' className='text-white font-bold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded mx-3'>
									Registera dig
								</NavLink>
						
					
				
			</div>
		);
	}
};

export default NavigationBar;

import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import NavImage from '../Images/Asset_1.svg';

const NavigationBar = () => {
	const [logedIn,SetLogedIn] = useState(false);
	const forceLogin = () => {
		if(logedIn === false)
		SetLogedIn(true);
		else
		SetLogedIn(false);
	}
	//if user is loged in we will show menu with links to the difrent pages, other wise we just show login and registera for now
	if (logedIn === true) {
		return (
			<div className='container'>
				<div id='header' className='navigation-menu'>
					<img id='mainLogo' src={NavImage} alt='My Happy SVG' />
					<ul id='navbar'>
						<li>
							<NavLink to='/inmatning' className='button'>
								Inmatning
							</NavLink>
						</li>
						<li>
                        <NavLink to='/listaexpenses' className='button'>
                        ListaExpenses

							</NavLink>
					
						</li>
						<li>
                        <NavLink to='/listaincomes' className='button'>
                        ListaIncomes

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
						<li><a  onClick={forceLogin} className='button'>
								Loga ut
							</a>
							
						</li>
					</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div className='container'>
				<div id='header' className='navigation-menu'>
					<img id='mainLogo' src={NavImage} alt='My Happy SVG' />
					<ul id='navbar'>
						<li>
							<NavLink to='/login' className='button'>
								Login
							</NavLink>
						</li>
						<li>
							<NavLink to='/register' className='button'>
								Registera dig
							</NavLink>
						</li>
						<li>
							<a  onClick={forceLogin} className='button'>
								dev-login
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
};

export default NavigationBar;

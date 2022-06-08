import React from 'react';
import { NavLink } from "react-router-dom";

const NavigationBar = (logedin) => {
	//if user is loged in we will show menu with links to the difrent pages, other wise we just show login and registera for now
	if (logedin === true) {
		return (
			<div class='container'>
				<div id='header' class='navigation-menu'>
					<img id='mainLogo' src='./images/Asset_1.svg' alt='My Happy SVG' />
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
                        <NavLink to='/budget' className='button'>
                        Skapa Budget

							</NavLink>
						
						</li>
						<li>
                        <NavLink to='/getbudget' className='button'>
								Visa Budget
							</NavLink>
						</li>
						<li><NavLink to='/logout' className='button'>
								Loga ut
							</NavLink>
							
						</li>
					</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div className='container'>
				<div id='header' class='navigation-menu'>
					<img id='mainLogo' src='./images/Asset_1.svg' alt='My Happy SVG' />
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
					</ul>
				</div>
			</div>
		);
	}
};

export default NavigationBar;

import React from 'react';
import { Link } from "react-router-dom";

const NavigationBar = (logedin) => {
	//if user is loged in we will show menu with links to the difrent pages, other wise we just show login and registera for now
	if (logedin === true) {
		return (
			<div class='container'>
				<div id='header' class='navigation-menu'>
					<img id='mainLogo' src='./images/Asset_1.svg' alt='My Happy SVG' />
					<ul id='navbar'>
						<li>
							<Link to='/inmatning' className='button'>
								Inmatning
							</Link>
						</li>
						<li>
                        <Link to='/listaexpenses' className='button'>
                        ListaExpenses

							</Link>
					
						</li>
						<li>
                        <Link to='/listaincomes' className='button'>
                        ListaIncomes

							</Link>
						
						</li>
						<li>
                        <Link to='/budget' className='button'>
                        Skapa Budget

							</Link>
						
						</li>
						<li>
                        <Link to='/getbudget' className='button'>
								Visa Budget
							</Link>
						</li>
						<li><Link to='/logout' className='button'>
								Loga ut
							</Link>
							
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
							<Link to='/login' className='button'>
								Login
							</Link>
						</li>
						<li>
							<Link to='/register' className='button'>
								Registera dig
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
};

export default NavigationBar;

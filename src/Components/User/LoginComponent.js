import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DefaultRender } from '../Services/errorHandler.js';
import API_Service from '../../API/API_Service.js';
import { useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Services/AuthProvider.js';

//first we create a "view" that is the html code we want to display


const Login = () => {
  const [errorMessage, setMessage] = useState ("");
	const { loginStatus, setLoginStatus } = useAuth();
	const { state } = useLocation();
	const previousPath = state?.from ? state.from : '/';
	const navigate = useNavigate();
	const [inputFields, setInputFields] = useState({
		userName: '',
		password: '',
	});
	const moveToWelcome = () => {
		navigate('/welcome');
	};

	const handleFormChange = (e) => {
		setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	let handleSubmit = (event) => {
		event.preventDefault();
	};
	const tryLogin = async (e) => {
		e.preventDefault();
		const post = inputFields;

		try {
			const fetchresult = await API_Service.PostService('User/login', post);
			if (fetchresult !== false) {
				CreateLoginToken(fetchresult);
				setLoginStatus(true);
				moveToWelcome();
			}
		} catch (e) {
			setMessage('Username or password is incorrect.');
		}

		function CreateLoginToken(data) {
			let token = data.token;
			let user = data.user;
			let expires = new Date(Date.now() + 86400 * 1000).toUTCString();

			document.cookie = `token=${token};user=${user};expires=${expires + 86400};path=/;`;
		}
	};
	return loginStatus ? (
		<Navigate to={previousPath} />
	) : (
			<div className="container">
				
				<div className='m-4'>
				<div className="text-xl font-bold">Login</div>
					<p>Saknar du ett konto? 
					<NavLink to='/registeruser' className="btn-base">
						Skapa konto
					</NavLink>
					</p>
				</div>

				<form id='form1' className='m-4' onSubmit={handleSubmit}>
					<div className='m-4'>
						<label htmlFor='username'>Användarnamn: </label>

						<input
							type='text'
							name='userName'
							placeholder='Fyll i ditt användarnamn'
							value={inputFields.userName}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>

					<div className='m-4'>
						<label htmlFor='password'>Lösenord: </label>

						<input
							type='password'
							name='password'
							placeholder='Fyll i ditt lösenord'
							value={inputFields.password}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>

					<div id='recover'>
<<<<<<< Updated upstream
						<NavLink to='/recover' id='recover-btn'>
							Glömt lösenordet?
						</NavLink>

						<input type='submit' name='login' value='Login' className='login-btn' onClick={tryLogin} />
=======
						<NavLink to='/recover' className='btn-base'>
						Glömt lösenordet?
								</NavLink>
						<input type='submit' name='login' value='Login' className='btn-base' onClick={tryLogin} />
>>>>>>> Stashed changes
							
					</div>

					<DefaultRender errorMessage={errorMessage}/>
				</form>
			</div>
		
	);
};

//we export this page so that app.js can call on it when the route is correct aka /login
export default Login;

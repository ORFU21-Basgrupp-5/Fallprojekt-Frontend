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
		<div className='container'>
			<div id='login'>
				<h1>Login</h1>
				<p>
					Saknar du ett konto?
					<NavLink to='/registeruser' id='reglink'>
						Skapa konto
					</NavLink>
				</p>

				<form id='form1' className='inputForm' onSubmit={handleSubmit}>
					<div id='uname'>
						<label htmlFor='username'>Användarnamn: </label>

						<input
							type='text'
							name='userName'
							placeholder='Fyll i ditt användarnamn'
							value={inputFields.userName}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>

					<div id='pswrd'>
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
						<NavLink to='/recover' id='recover-btn'>
							Glömt lösenordet?
						</NavLink>

						<input type='submit' name='login' value='Login' className='login-btn' onClick={tryLogin} />
							
					</div>

					<DefaultRender errorMessage={errorMessage}/>
				</form>
			</div>
		</div>
	);
};

//we export this page so that app.js can call on it when the route is correct aka /login
export default Login;

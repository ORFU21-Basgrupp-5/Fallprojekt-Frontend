import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service.js';
import { useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Services/AuthProvider.js';
import { FaSpinner } from 'react-icons/fa';
//first we create a "view" that is the html code we want to display


const Login = () => {
	const [loading, setLoading] = useState(false);
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
			setLoading(true)
			const fetchresult = await API_Service.PostService('User/login', post);
			if (fetchresult !== false) {
				CreateLoginToken(fetchresult);
				setLoginStatus(true);
				moveToWelcome();
			}
			else{
				setMessage('Username or password is incorrect.');
				
			}
		} catch (e) {			
			setMessage('Could not log in, check your internet connection')
		}
		finally{
			setLoading(false)
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
		<div className='flex justify-center mt-20'>
			<div id='login'>

				<form id='form1' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
					<div id='uname' className='mb-4'>
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username'>Användarnamn: </label>

						<input
						    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
							type='text'
							name='userName'
							placeholder='Fyll i ditt användarnamn'
							value={inputFields.userName}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>

					<div id='pswrd' className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>Lösenord: </label>

						<input
						    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
							type='password'
							name='password'
							placeholder='Fyll i ditt lösenord'
							value={inputFields.password}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>

					<div id='recover' className="flex items-center justify-between">
						<NavLink to='/recover' id='recover-btn' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
							Glömt lösenordet?
						</NavLink>

						<button  type='submit' name='login' className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={tryLogin}>
						Login
						{loading &&
							<span className='animate-spin h-5 w-5 ml-3 inline-block text-center'>
							<FaSpinner/>
							</span>
							}
							</button> 
							
					</div>

					<DefaultRender errorMessage={errorMessage}/>
				</form>
				<div className='flex justify-center'>
			<p className="block text-gray-700 text-sm font-bold mb-2 ">
					Saknar du ett konto?
					<NavLink to='/registeruser' id='reglink'>
						Skapa konto
					</NavLink>
				</p>
			</div>
			</div>
			
		</div>
		
		
	);
};

//we export this page so that app.js can call on it when the route is correct aka /login
export default Login;

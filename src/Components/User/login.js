import { useState} from 'react';
import { DefaultRender } from '../errorHandler.js';
import API_Service from '../../API/API_Service.js';
//first we create a "view" that is the html code we want to display
const Login = () => {
	const [inputFields, setInputFields] = useState({
		userName: '',
		password: '',
	});
	//let currenturl = new URL(document.URL);
	//let urlparams = new URLSearchParams(currenturl.search);
	const handleFormChange = (e) => {
		setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// if (urlparams.get("token") != null) {
	//   Recoverpassword(pageContent, urlparams.get("token"));
	//   console.log("token param found");
	// } else {

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
			}
		} catch (e) {
			DefaultRender('Username or password is incorrect.');
		}

		

		function CreateLoginToken(data) {
			let token = data.token;
			let user = data.user;
			let expires = new Date(Date.now() + 86400 * 1000).toUTCString();

			const cookie = (document.cookie = 'token=' + token + ';' + 'user=' + user + ';' + 'expires=' + expires + 86400 + ';path=/;');

			// let activeUser = userLoginDTO.userName;
			// sessionStorage.setItem("User", activeUser);

			//Welcomepage(pageContent);
			//let header = new Header();
		}
		//'Authorization': 'Bearer ' + cookies.get('token')
	};

	return (
		<div className='container'>
			<div id='login'>
				<h1>Login</h1>
				<p>
					Saknar du ett konto?{' '}
					<a href='./#/registeruser' id='reglink'>
						Skapa konto
					</a>
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
						<button  id='recover-btn'>
							Glömt lösenordet?
						</button>
            
						<button className='login-btn' onClick={tryLogin}>
							login
						</button>
					
					</div>

					
					<div id='errorDiv' className='errorMessage'></div>
				</form>
			</div>
		</div>
	);
};

//we export this page so that app.js can call on it when the route is correct aka /#/login
export default Login;

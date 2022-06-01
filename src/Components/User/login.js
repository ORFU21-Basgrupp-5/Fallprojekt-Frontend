import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DefaultRender } from './errorHandler.js';
import { GetCookie } from './cookie.js';
import API_Service from './API_Service.js';

//first we create a "view" that is the html code we want to display
const login = () => {
	const [inputFields, setInputFields] = useState({
		userName: '',
		password: '',
	});
	let currenturl = new URL(document.URL);
	let urlparams = new URLSearchParams(currenturl.search);
	const handleFormChange = (e) => {
		setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// if (urlparams.get("token") != null) {
	//   Recoverpassword(pageContent, urlparams.get("token"));
	//   console.log("token param found");
	// } else {
	let pageContent = document.getElementById('pageContent');

	const linkToRecover = document.getElementById('recover-btn');
	linkToRecover.onclick = function (e) {
		e.preventDefault();
		Render(pageContent);
	};

	let reglink = document.getElementById('reglink');
	//console.log("Password to TestKonto1: Admin2Lösen**")
	reglink.onclick = function (e) {
		e.preventDefault();
		RegRender(pageContent);
	};

	let form = document.getElementById('login-form');
	let loginButton = document.getElementById('btn');

	loginButton.onclick = (e) => {
		e.preventDefault();
		const userlogin = [document.forms['login-form']['username'].value, document.forms['login-form']['password'].value];

		const userLoginDTO = {
			userName: document.forms['login-form']['username'].value,
			//password: "Admin2Lösen**"
			password: document.forms['login-form']['password'].value,
		};
		const upvalidate = userlogin.every((login) => login != '');
		if (upvalidate) {
			fetchLogin(userLoginDTO);
		}
		// 'An error has occurred: 404'
		else {
			DefaultRender('All fields must be filled.');
		}
	};

	const tryLogin = async (e) => {
		e.preventDefault();
		const post = inputFields;
		try {
			const fetchresult = await API_Service.PostService('User/login', post);

			if (fetchresult != false) {
				CreateLoginToken(fetchresult);
			}
		} catch (e) {
			DefaultRender('Username or password is incorrect.');
		}

		let handleSubmit = (event) => {
			event.preventDefault();
		};

		function CreateLoginToken(data) {
			let token = data.token;
			let user = data.user;
			let expires = new Date(Date.now() + 86400 * 1000).toUTCString();

			const cookie = (document.cookie = 'token=' + token + ';' + 'user=' + user + ';' + 'expires=' + expires + 86400 + ';path=/;');

			// let activeUser = userLoginDTO.userName;
			// sessionStorage.setItem("User", activeUser);

			Welcomepage(pageContent);
			let header = new Header();
		}
		//'Authorization': 'Bearer ' + cookies.get('token')
	};

	return (
		<div class='container'>
			<div id='login'>
				<h1>Login</h1>
				<p>
					Saknar du ett konto?{' '}
					<a href='./#/registeruser' id='reglink'>
						Skapa konto
					</a>
				</p>

				<form id='form1' class='inputForm' onSubmit={handleSubmit}>
					<div id='uname'>
						<label for='username'>Användarnamn: </label>

						<input
							type='text'
							name='username'
							placeholder='Fyll i ditt användarnamn'
							value={inputFields.userName}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>

					<div id='pswrd'>
						<label for='password'>Lösenord: </label>

						<input
							type='password'
							name='password'
							placeholder='Fyll i ditt lösenord'
							value={inputFields.password}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>

					<div id='recover'>
						<a href='' id='recover-btn'>
							Glömt lösenordet?
						</a>
					</div>

					<div id='btn'>
						<button className='login-btn' onClick={tryLogin}>
							login
						</button>
					</div>
					<div id='errorDiv' class='errorMessage'></div>
				</form>
			</div>
		</div>
	);
};

//we export this page so that app.js can call on it when the route is correct aka /#/login
export default login;

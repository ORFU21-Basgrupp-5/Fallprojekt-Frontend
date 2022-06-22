import { useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const Register = () => {
	const navigate = useNavigate();
	const [errorMessage, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [counter, setCounter] = useState(0);
	const [disableSubmit, setdisableSubmit] = useState(false);
	const [timer, setTimer] = useState(0);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmpassword: '',
	});

	const handleChange = (e) => {
		setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	let handleSubmit = (event) => {
		event.preventDefault();

		ValidateUser();
	};

	const FetchReg = async () => {
		try {
			setdisableSubmit(true);
			setLoading(true);
			let postData = {};
			for (const [key, value] of Object.entries(formData)) {
				postData[key] = value;
			}
			delete postData['confirmpassword'];
			const res = await API_Service.PostService('User/register', postData);
			if (res !== false) {

				setMessage('Registrerad. Går till login...');
				setCounter(counter + 1);
				setTimeout(() => {
					navigate('/login');
				}, 3000);
			} else {
				setMessage('Användarnamn eller Epost används');
				setCounter(counter + 1);
				setdisableSubmit(false);
				setLoading(false);
			}
		} catch (e) {
			setMessage('Syntax Error!');
			setCounter(counter + 1);
			setdisableSubmit(false);
		}
	};

	const ValidateUser = () => {
		setLoading(true);
		const usernamevalidate = Object.values(formData).every((x) => x !== '');
		if (usernamevalidate) {
			if (formData.password !== formData.confirmpassword) {
				setMessage('Lösenorden matchar inte!');
				setCounter(counter + 1);
				setLoading(false);
				setTimer(4000);
			} else if (CheckPassword(formData.password) === false) {
				setMessage('Ditt lösenord måste ha minst 12 tecken, en gemen, en storbokstav, en siffra och ett special tecken');
				setCounter(counter + 1);
				setLoading(false);
				setTimer(8000);
			} else {
				FetchReg();
			}
		} else {
			setMessage('Du måste fylla i alla fälten!');
			setCounter(counter + 1);
			setLoading(false);
			setTimer(4000);
		}
	};

	const CheckPassword = (password) => {
		var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,50}$/;
		if (password.match(paswd)) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className='container'>
			<div>
				<h1 className='dark:text-white mb-10'>Skapa ett konto</h1>
				<form className='form-main'>
					<div id='hidden-message' />
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='username'>
							Användarnamn:{' '}
						</label>
						<input
							required
							className='input-main'
							type='text'
							value={formData.username}
							name='username'
							onChange={(e) => handleChange(e)}
							placeholder='Välj ett användarnamn'
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='email'>
							Epost:{' '}
						</label>
						<input
							required
							className='input-main'
							type='text'
							value={formData.email}
							name='email'
							onChange={(e) => handleChange(e)}
							placeholder='Fyll i din epost'
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='password'>
							Lösenord:{' '}
						</label>
						<input
							required
							className='input-main'
							type='password'
							value={formData.password}
							name='password'
							onChange={(e) => handleChange(e)}
							placeholder='Välj ett lösenord'
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='password2'>
							Bekräfta lösenord:{' '}
						</label>
						<input
							required
							className='input-main'
							type='password'
							value={formData.confirmpassword}
							onChange={(e) => handleChange(e)}
							name='confirmpassword'
							placeholder='Bekräfta lösenord'
						/>
					</div>
					<div>
						<button className='menu-reg-btn' id='budgetSumbit' disabled={disableSubmit ? true : false} onClick={handleSubmit}>
							{' '}
							{!loading && 'Registera'}
							{loading && (
								<span className='animate-spin inline-block text-center'>
									<FaSpinner />
								</span>
							)}
						</button>
					</div>

					<DefaultRender errorMessage={errorMessage} counter={counter} timer={timer} />
				</form>
				<div className='label-linkwrap'>
					<p className='label-main'>
						Har du redan ett konto?{' '}
						<NavLink className='menu-textlink' to='/login' id='reglink'>
							Logga in här
						</NavLink>
					</p>
				</div>
			</div>
		</div>
	);
};
export default Register;

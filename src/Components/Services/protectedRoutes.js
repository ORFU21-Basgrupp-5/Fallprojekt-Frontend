import React from 'react';
import { GetCookie } from '../Components/Services/cookie.js';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
	//get item from localstorage

	let user;

	const _user = GetCookie('user');

	if (_user) {
		user = JSON.parse(_user);
		console.log('user', user);
	}
	if (user) {
		return {
			auth: true,
		};
	} else {
		return {
			auth: false,
		};
	}
};

//protected Route state

const ProtectedRoutes = () => {
	const { auth } = useAuth();

	//if the role required is there or not
	if (auth) {
		return <Outlet />;
	} else {
		return <Navigate to='/login' />;
	}
};

export default ProtectedRoutes;

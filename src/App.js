import { Fragment, Image  } from 'react';
import { Outlet,NavLink } from 'react-router-dom';
import './CSS/App.css';
<<<<<<< HEAD
import Logo from './Images/LoggaBudgeteraMera.png';
=======
import RecoverEmail from './Components/User/recoveremail'
import Inmatning from './Components/Budget/inmatning'
import ChangePassword from './Components/User/changepassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegForm from './Components/User/reg'

>>>>>>> eb6ac23adb0112f9591ad52a1dbc2b69ad1bef14

function App() {
  return (
    <Fragment>
    <div className="App">
        <div className='header'>
        <NavLink className='links' to="/login">
          Login
        </NavLink>
        <NavLink className='links' to="/register">
          Register
        </NavLink>
        </div>
        <div className='logo'>
         <img src={Logo}>
         </img>
        </div>
      <Outlet/>
    </div>
    </Fragment>
  );
}

export default App;

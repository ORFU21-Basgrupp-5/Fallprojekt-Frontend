import { Fragment, Image  } from 'react';
import { Outlet,NavLink } from 'react-router-dom';
import './CSS/App.css';
import Logo from './Images/LoggaBudgeteraMera.png';

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

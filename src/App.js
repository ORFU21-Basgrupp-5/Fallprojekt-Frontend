import { Fragment  } from 'react';
import { Outlet,NavLink } from 'react-router-dom';
import './CSS/App.css';

function App() {
  return (
    <Fragment>
    <div className="App">
      <header className="App-header">
        
        <p>
         hey hey start
        </p>
        <a>
        <NavLink to="/login">
          Login
        </NavLink>
        </a>
      </header>
      <Outlet/>
    </div>
    </Fragment>
  );
}

export default App;

import { Fragment,  } from 'react';
import { Outlet } from 'react-router-dom';
import './CSS/App.css';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
function App() {

  return (
    <Fragment>
    <div className="App">
        <div className='header'>
        <NavigationBar/>
        </div>
      <Outlet/>
      <Footer/>
    </div>
    </Fragment>
  );
}

export default App;

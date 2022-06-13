import { Fragment,  } from 'react';
import MainRoutes from './routes.js';
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
        <MainRoutes/>
      <Footer/>
    </div>
    </Fragment>
  );
}

export default App;

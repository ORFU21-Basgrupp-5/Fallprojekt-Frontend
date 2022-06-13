import { Routes, Route } from 'react-router';
import './CSS/App.css';
import PrivateOutlet from './Components/Services/PrivateComponent.js';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Login from './Components/User/LoginComponent.js';
import Register from './Components/User/RegisterUserComponent.js';
import ChangePassword from './Components/User/ChangePasswordComponent.js';
import RecoverEmail from './Components/User/RecoveryEmailComponent.js';
import GetBudget from './Components/Budget/GetBudgetComponent';
import Home from './Components/home.js';
import Budget from './Components/Budget/BudgetComponent';
import AddBalanceChange from './Components/Budget/AddBalanceChangeComponent';
import History from './Components/Budget/HistoryComponent.js'
import Welcome from './Components/User/WelcomeComponent';



// if you are not logged in (auth) if you try and go to a route under the 
//privateOutlet you will get redirected to login. 
function App() {
	return (
		<div className='App'>
			<NavigationBar /> //dynamic navigationBar that always will render and swaps depending on auth status.
			<Routes>
        //public routes
				<Route path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/registeruser' element={<Register />} />
				<Route exact path='/recover' element={<RecoverEmail />} />
        //private routes, required auth=true.
				<Route path='/*' element={<PrivateOutlet />}>
          <Route exact path='welcome' element={<Welcome />} />
					<Route exact path='GetBudget' element={<GetBudget />} />
					<Route exact path='addbudget' element={<Budget />} />
					<Route exact path='History' element={<History />} />
          <Route exact path='AddBalanceChange' element={<AddBalanceChange />}/>
					<Route exact path='changePassword' element={<ChangePassword />} />
				</Route>
			</Routes>
			<Footer /> //dynamic footer,. currently static but dynamic functions can be writen.
		</div>
	);
}

export default App;

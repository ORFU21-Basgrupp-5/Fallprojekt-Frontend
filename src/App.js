import { Routes, Route } from 'react-router';
import PrivateOutlet from './Components/Services/PrivateComponent.js';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Login from './Components/User/LoginComponent.js';
import Register from './Components/User/RegisterUserComponent.js';
import ChangePassword from './Components/User/ChangePasswordComponent.js';
import RecoverEmail from './Components/User/RecoveryEmailComponent.js';
import GetBudget from './Components/Budget/GetBudgetComponent';
import Home from './Components/home.js';
import About from './Components/tempviews/about.js';
import Contact from './Components/tempviews/contact.js';
import Eco from './Components/tempviews/eco.js';
import Payment from './Components/tempviews/payment.js';
import Prediction from './Components/tempviews/prediction.js';
import Budget from './Components/Budget/BudgetComponent';
import AddBalanceChange from './Components/Budget/AddBalanceChangeComponent';
import History from './Components/Budget/HistoryComponent.js'
import Welcome from './Components/User/WelcomeComponent';




// if you are not logged in (auth) if you try and go to a route under the 
//privateOutlet you will get redirected to login. 
function App() {
	return (
		<div className="flex flex-col h-screen">
			<NavigationBar /> 
			<div className='p-4 flex-grow z-0'>
			<div className='container mx-auto rounded max-w-5xl' >
			<Routes>
				<Route path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/registeruser' element={<Register />} />
				<Route exact path='/recover' element={<RecoverEmail />} />
				<Route exact path='/about' element={<About />} />
				<Route exact path='/contact' element={<Contact />} />
				<Route exact path='/eco' element={<Eco />} />
				<Route exact path='/payment' element={<Payment />} />
				<Route exact path='/prediction' element={<Prediction />} />
				<Route path='/*' element={<PrivateOutlet />}>
          <Route exact path='welcome' element={<Welcome />} />
					<Route exact path='GetBudget' element={<GetBudget />} />
					<Route exact path='addbudget' element={<Budget />} />
					<Route exact path='History' element={<History />} />
          <Route exact path='AddBalanceChange' element={<AddBalanceChange />}/>
					<Route exact path='changePassword' element={<ChangePassword />} />
				</Route>
			</Routes>
			</div>
			</div>
			<Footer/>
		</div>
	);
}

export default App;

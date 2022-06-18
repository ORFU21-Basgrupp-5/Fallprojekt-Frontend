import { NavLink } from 'react-router-dom';
import NeutralNet from '../Images/neural.png';
import svgPicture from '../Images/svg2.svg';
import credCard from '../Images/creditcard.png';
import chart from '../Images/chart.png';
import { useAuth } from './Services/AuthProvider.js';
import API_Service from '../API/API_Service';
import { useEffect, useState } from 'react';


const Home = () => {
	const { loginStatus, setLoginStatus } = useAuth();
        const [data, setData] = useState({quote:'Loading...',author:'Loading..'});
        const [test, setTest] = useState(false);
        useEffect(() => {
                const fetchData = async () => {
                  const fetchresult = await API_Service.GetQuotesService();
                  if (fetchresult != null) {
                    setData({quote:fetchresult[0]['quote'],author:fetchresult[0]['author']});
                  }
                  
                };
                fetchData();
              }, [test]);
        if(test === false)
        setTest(true);
	if (loginStatus.status === true) {
                
               

                return (
                <div className='container mx-auto mb-40 mt-10 text-center text-white'>
					<h1 className='text-5xl mb-5'>
						Welcome <br />
						{loginStatus.user}
					</h1>
					<p className="mb-10 mt-10">{data.quote}</p>
                                        <p>Author:  {data.author}</p>
				</div>)
	} else {
		return (
			<>
				<div className='container mx-auto mb-40 mt-10 text-center text-white'>
					<h1 className='text-5xl mb-5'>
						An Budget App For a <br />
						Modern World
					</h1>
					<p>Spend less time worrying about your economy, more time enjoying life</p>
				</div>
				<div className='container mx-auto mb-40 text-center text-white flex flex-col md:flex-col items-center sm:flex-col sm:gap-10 md:gap-18 lg:flex-row lg:gap-36 justify-center'>
					<div className='ml-auto mr-auto lg:mr-10 lg:ml-10 mb-20 w-60'>
						<img id='subImage' src={NeutralNet} alt='Ai Predictions' className='h-16 mx-auto mb-5' />
						<p className='text-center mx-auto mb-5 h-28'>Let our Ai-predictions guide your saving.</p>
						<NavLink to='/prediction' className='menu-sub-btn'>
							Ai-predictions Process
						</NavLink>
					</div>
					<div className='ml-auto mr-auto lg:mr-10 lg:ml-10 mb-20 w-60'>
						<img id='subImage' src={svgPicture} alt='Ai Predictions' className='h-16 mx-auto mb-5' />
						<p className='text-center mx-auto mb-5 h-28'>Reduce your carbon footprint.</p>
						<NavLink to='/eco' className='menu-sub-btn'>
							Eco Process
						</NavLink>
					</div>
					<div className='ml-auto mr-auto lg:mr-10 lg:ml-10 mb-20 w-60'>
						<img id='subImage' src={credCard} alt='Ai Predictions' className='h-16 mx-auto mb-5' />
						<p className='text-center mx-auto mb-5 h-28'>Get rid of all your credit cards.</p>
						<NavLink to='/payments' className='menu-sub-btn'>
							Payment alternatives
						</NavLink>
					</div>
				</div>
				<div className='container mx-auto mb-40 text-center flex flex-row items-baseline gap-10 justify-center text-white'>
					<p>Ready to get your economy started?</p>
					<NavLink to='/registeruser' className='menu-reg-btn'>
						Start Saving
					</NavLink>
				</div>
				<div className='container mx-auto mb-40 mt-10 text-lefts text-white flex items-center'>
					<div className='text'>
						<p>Superior Predictions and Analytics</p>
						<p className='text-3xl mb-5 text-lefts'>Every stat you need to have full controll</p>

						<p className='max-w-xl'>
							We’ve build our system from the ground up, by both economics and familiy planing experts alike. From realtime
							budget anlaytics to comparing and findin the optimal planing, we’ve got you covered.
						</p>
					</div>
					<img id='subImage' src={chart} alt='Ai Predictions' className='ml-20 h-52' />
				</div>
			</>
		);
	}
};
export default Home;

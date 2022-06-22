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
                <div className='container mx-auto mb-40 mt-10 text-center dark:text-white'>
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
				<div className='container mx-auto mb-40 mt-10 text-center dark:text-white'>
					<h1 className='text-5xl mb-5'>
						En budget app för den <br />
						Moderna Världen
					</h1>
					<p>Spendera mindra tid oroa dig över ekonomin, njut nu</p>
				</div>
				<div className='container mx-auto mb-40 text-center dark:text-white flex flex-col md:flex-col items-center sm:flex-col sm:gap-10 md:gap-18 lg:flex-row lg:gap-36 justify-center'>
					<div className='ml-auto mr-auto lg:mr-10 lg:ml-10 mb-20 w-60'>
						<img id='subImage' src={NeutralNet} alt='Ai Predictions' className='h-16 mx-auto mb-5' />
						<p className='text-center mx-auto mb-5 h-28'>Låt våra ai-förutsägelser vägleda dig.</p>
						<NavLink to='/prediction' className='menu-sub-btn'>
							Ai-förutsägelser
						</NavLink>
					</div>
					<div className='ml-auto mr-auto lg:mr-10 lg:ml-10 mb-20 w-60'>
						<img id='subImage' src={svgPicture} alt='Ai Predictions' className='h-16 mx-auto mb-5' />
						<p className='text-center mx-auto mb-5 h-28'>Reducera din klimat påverkan</p>
						<NavLink to='/eco' className='menu-sub-btn'>
							Eco påverkan
						</NavLink>
					</div>
					<div className='ml-auto mr-auto lg:mr-10 lg:ml-10 mb-20 w-60'>
						<img id='subImage' src={credCard} alt='Ai Predictions' className='h-16 mx-auto mb-5' />
						<p className='text-center mx-auto mb-5 h-28'>Gör dig av med alla kreditkort</p>
						<NavLink to='/payments' className='menu-sub-btn'>
							Betalnings altenativ
						</NavLink>
					</div>
				</div>
				<div className='container mx-auto mb-40 text-center flex flex-row items-baseline gap-10 justify-center dark:text-white'>
					<p>Redo att starta din nya ekonomi</p>
					<NavLink to='/registeruser' className='menu-reg-btn'>
						Börja spara
					</NavLink>
				</div>
				<div className='container mx-auto mb-40 mt-10 text-lefts dark:text-white flex items-center'>
					<div className='text'>
						<p>Överlägsna förutsägelser och analyser </p>
						<p className='text-3xl mb-5 text-lefts'>Varje stat du behöver för att ha full kontroll</p>

						<p className='max-w-xl'>
						Vi har byggt vårt system från grunden, av både ekonomi- och familje rådgivare. Från realtid budget anlaytics för att jämföra och hitta den optimala planeringen, du kan känna dig trygg.
						</p>
					</div>
					<img id='subImage' src={chart} alt='Ai Predictions' className='ml-20 h-52' />
				</div>
			</>
		);
	}
};
export default Home;

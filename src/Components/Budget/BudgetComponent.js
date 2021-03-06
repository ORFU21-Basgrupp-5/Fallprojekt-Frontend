import { useEffect, useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service.js';
import { FaSpinner } from 'react-icons/fa';

const Budget = () => {
	const initialData = { name: '', totalSum: 0, date: '', month: '', year: '', categoriesAndAmount: {} };
	const initialCatData = { Food: 0, Car: 0, Subscriptions: 0, Clothes: 0, Treat: 0, Other: 0 };
	const [loading, setLoading] = useState(false);
	const [errorMessage, setMessage] = useState('');
	const [counter, setCounter] = useState(0);
	const [timer, setTimer] = useState(0);
	const [data, setData] = useState(initialData);
	const [catData, setCatData] = useState(initialCatData);

	const [posted, setPosted] = useState(false);
	const [validated, setValidated] = useState(false);
	const [disableSubmit, setdisableSubmit] = useState(true);
	const [sumLeft, setSumLeft] = useState();

	useEffect(() => {
		const catSum = Object.values(catData)
			.map(Number)
			.reduce(function (a, b) {
				return a + b;
			}, 0);
		setSumLeft(data.totalSum - catSum);

		if (sumLeft > 0 || sumLeft < 0 || Object.values(catData).every((x) => x === 0)) {
			setValidated(false);
			setdisableSubmit(true);
		} else if (sumLeft === 0) {
			if (posted === false && data.date != '') {
				setdisableSubmit(false);
				setValidated(true);
			}
		}
	}, [catData, data.totalSum,data.date ,sumLeft, posted]);
	const handleFormChange = (e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleCatChange = (e) => {
		setCatData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const uploadBudget = async (e) => {
		if (validated) {
			try {
				setLoading(true);
				let postData = data;
				postData['month'] = new Date(postData.date).getMonth();
				postData['year'] = new Date(postData.date).getFullYear();
				delete postData['date'];
				postData['categoriesAndAmount'] = catData;
				const fetchresult = await API_Service.PostService('Budget', postData);
				if (fetchresult !== false) {
					setPosted(true);
					setdisableSubmit(true);
					setMessage('Din budget ??r nu sparad!');
					setCounter(counter + 1);
					setData(initialData);
					setCatData(initialCatData);
				}
			} catch {
				setMessage('Sparning misslyckades');
				setCounter(counter + 1);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className='container'>
			<h1 className='text-white mb-10'>Skapa en ny Budget</h1>
			{loading ?? (
				<span className='animate-spin inline-block text-center'>
					<FaSpinner />
				</span>
			)}
			<div id='budgetForm'>
				<form id='form1' className='form-main' onSubmit={handleSubmit}>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='name'>
							Namn:
						</label>
						<input
							className='input-main'
							type='text'
							id='name'
							value={data.name}
							onChange={(event) => handleFormChange(event)}
							name='name'
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='totalSum'>
							Total belopp:
						</label>
						<input
							className='input-main'
							type='number'
							name='totalSum'
							id='totalSum'
							value={data.totalSum}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>
					<div className='input-wrapper'>
						<p>Belopp kvar: {sumLeft}</p>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='date'>
							Budget m??nad:
						</label>
						<input
							className='input-main'
							type='date'
							id='budgetDate'
							name='date'
							value={data.date}
							onChange={(event) => handleFormChange(event)}
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor=''>
							Kategorier:
						</label>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='Food'>
							Food:
						</label>
						<input
							className='input-main'
							type='number'
							name='Food'
							value={catData.Food}
							onChange={(event) => handleCatChange(event)}
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='Car'>
							Bil:
						</label>
						<input
							className='input-main'
							type='number'
							name='Car'
							value={catData.Car}
							onChange={(event) => handleCatChange(event)}
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='Subscriptions'>
							Abonemang:
						</label>
						<input
							className='input-main'
							type='number'
							name='Subscriptions'
							value={catData.Subscriptions}
							onChange={(event) => handleCatChange(event)}
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='Clothes'>
							Kl??der:
						</label>
						<input
							className='input-main'
							type='number'
							name='Clothes'
							value={catData.Clothes}
							onChange={(event) => handleCatChange(event)}
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='Treat'>
							N??je:
						</label>
						<input
							className='input-main'
							type='number'
							name='Treat'
							value={catData.Treat}
							onChange={(event) => handleCatChange(event)}
						/>
					</div>
					<div className='input-wrapper'>
						<label className='label-main' htmlFor='Other'>
							Annat:
						</label>
						<input
							className='input-main'
							type='number'
							name='Other'
							value={catData.Other}
							onChange={(event) => handleCatChange(event)}
						/>
					</div>

					<button
						className={disableSubmit ? 'btn-disabled' : 'btn-main'}
						id='budgetSumbit'
						disabled={disableSubmit ? true : false}
						onClick={uploadBudget}
					>
						{disableSubmit ? <p>Belopp kvar: {sumLeft}</p> : 'Spara'}
						{loading && (
							<span className='animate-spin inline-block text-center'>
								<FaSpinner />
							</span>
						)}
					</button>
				</form>
			</div>
			<DefaultRender errorMessage={errorMessage} counter={counter} />
		</div>
	);
};
export default Budget;

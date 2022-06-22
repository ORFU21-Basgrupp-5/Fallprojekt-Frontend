import { useState, useEffect } from 'react';
import API_Service from '../../API/API_Service.js';
import { DefaultRender } from '../Services/messageHandler.js';
import { FaSpinner } from 'react-icons/fa';

const History = () => {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setMessage] = useState('');
	const [counter, setCounter] = useState(0);
	const [timer, setTimer] = useState(0);
	const [data, setData] = useState();

	useEffect(() => {
		try {
			setLoading(true);
			const fetchData = async () => {
				const res = await API_Service.GetService('Expense');
				const res2 = await API_Service.GetService('Income');
				if (res != null && res != null) {
					res2.map((x) => res.push(x));
					res.map((x) => ('expenseDate' in x ? (x['Date'] = x.expenseDate) : (x['Date'] = x.incomeDate)));
					res.map((x) => ('expenseDate' in x ? delete x.expenseDate : delete x.incomeDate));
					res.sort(function (a, b) {
						return new Date(a.Date) - new Date(b.Date);
					});
					setData(res);
				}
			};
			fetchData();
		} catch {
			setMessage('Kunde inte hämta data');
			setCounter(counter + 1);
			setTimer(4000);
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<>
			<div className=''>
				<h1 className='text-white mb-10'>History</h1>
        {loading ?? (
				<span className='animate-spin inline-block text-center'>
					<FaSpinner />
				</span>
			)}
				<table className='table-main'>
					<tr>
						<th className='table-header'>Datum</th>
						<th className='table-header'>Beskrivning</th>
						<th className='table-header'>Belopp ändring</th>
					</tr>
					{data?.map((x) => (
						<tr className={'expenseDescription' in x ? 'table-row-expense' : 'table-row-income'}>
							<td className='table-cell-w'>{new Date(x.Date).toDateString()}</td>
							<td className='table-cell-w'>{'expenseDescription' in x ? x.expenseDescription : x.incomeDescription}</td>
							<td className='table-cell-w'>
								{'expenseBalanceChange' in x ? '-' + x.expenseBalanceChange : '+' + x.incomeBalanceChange} kr
							</td>
						</tr>
					))}
				</table>
			</div>
			<DefaultRender errorMessage={errorMessage} counter={counter} />
		</>
	);
};

export default History;

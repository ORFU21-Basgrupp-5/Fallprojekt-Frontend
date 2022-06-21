import { useState, useEffect } from "react";
import API_Service from "../../API/API_Service.js";
import { DefaultRender } from '../Services/messageHandler.js';
import { FaSpinner } from 'react-icons/fa';

const History = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState();

  
    useEffect(() => {
      try {
      setLoading(true)
      const fetchData = async () => {
        const res = await API_Service.GetService('Expense');
        const res2 = await API_Service.GetService('Income');
        if (res != null && res != null) {
          res2.map(x => res.push(x))
          res.map(x => ('expenseDate' in x) ? x['Date'] = x.expenseDate : x['Date'] = x.incomeDate);
          res.map(x => ('expenseDate' in x) ? delete x.expenseDate : delete x.incomeDate)
          res.sort(function (a, b) {
            return new Date(a.Date) - new Date(b.Date);
          });
          setData(res);
        }
      };
      fetchData();
    }
    catch {
      setMessage('Can not show history.');
      setCounter(counter + 1);
    }
    finally{
      setLoading(false)
    }
    }, []);


  return (
    <div className='container'>
      {loading &&
							<span className='animate-spin h-5 w-5 ml-3 inline-block'>
							<FaSpinner/>
							</span>}
      <div className=''>
      <h1>Historik</h1>
        <table className="table-main">
        
          <tr>
            <th className="table-header">Datum</th>
            <th className="table-header">Beskrivning</th>
            <th className="table-header">Belopp ändring</th>
          </tr>
          {data?.map(x =>
            <tr className="table-row">
              <td className="table-cell">
                {new Date(x.Date).toDateString()}
              </td>
              <td className="table-cell">
                {("expenseDescription" in x) ? x.expenseDescription : x.incomeDescription}
              </td>
              <td className="table-cell">
                {("expenseBalanceChange" in x) ? '-' + x.expenseBalanceChange : '+' + x.incomeBalanceChange} kr
              </td>
            </tr>)}
        </table>
      </div>
      <DefaultRender errorMessage={errorMessage} counter={counter} />
    </div>
  );
};

export default History;

import { useState, useEffect } from "react";
import { GetCookie } from "../Services/cookie.js";
import API_Service from "../../API/API_Service.js";
import { DefaultRender } from '../Services/messageHandler.js';

const History = () => {
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState();

  try {
    useEffect(() => {
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

    }, []);
  } catch {
    setMessage('Can not show history.');
    setCounter(counter + 1);
  }

  return (
    <div className='container'>

      <div className=''>
      <h4>History</h4>
        <table className="table-main">
          <tr>
            <th className="table-header">Date</th>
            <th className="table-header">Description</th>
            <th className="table-header">Balance Change</th>
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

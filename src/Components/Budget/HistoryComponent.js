import { useState, useEffect } from "react";
import { GetCookie } from "../Services/cookie.js";
import API_Service from "../../API/API_Service.js";
import { DefaultRender } from '../Services/messageHandler.js';

const History = () => {
  const [errorMessage, setMessage] = useState("");
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
  }

  return (
    <div className='flex justify-center mt-20'>
      <h1>History</h1>
      <div className='table'>
        <table>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Balance Change</th>
          </tr>
          {data?.map(x =>
            <tr>
              <td>
                {new Date(x.Date).toDateString()}
              </td>
              <td>
                {("expenseDescription" in x) ? x.expenseDescription : x.incomeDescription}
              </td>
              <td>
                {("expenseBalanceChange" in x) ? '-' + x.expenseBalanceChange : '+' + x.incomeBalanceChange} kr
              </td>
            </tr>)}
        </table>
      </div>
      <DefaultRender errorMessage={errorMessage} />
    </div>
  );
};

export default History;

import {useState, useEffect} from "react";
import { GetCookie } from "../Services/cookie.js";
import { DefaultRender } from "../Services/errorHandler.js";
import API_Service from "../../API/API_Service.js";

const History = () => {
  const [data, setData] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await API_Service.GetService('Expense');
      const res2 = await API_Service.GetService('Income');
      if (res != null && res != null) {
        res2.map(x => res.push(x))
        res.sort(function (a, b) {
          return a.expenseDate - b.incomeDate;
        });
        setData(res);
      }
    };
    fetchData();
  }, []);

  return(
    <div className='container'>
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
              {("expenseDate" in x) ? new Date(x.expenseDate).toDateString() : new Date(x.incomeDate).toDateString()}
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
      <div id="errorDiv"></div>
    </div>
  );
};

export default History;

import { GetCookie } from "../Services/cookie.js";
import { useState, useEffect } from 'react';
import API_Service from '../../API/API_Service.js';
import { DefaultRender } from '../Services/messageHandler.js';

const GetBudget = () => {
  const [errorMessage, setMessage] = useState("");
  const [data, setData] = useState();

  try {
    useEffect(() => {
      const fetchData = async () => {
        const fetchresult = await API_Service.GetService('Budget');
        if (fetchresult != null) {
          setData(fetchresult);
        }
      };
      fetchData();
    }, []);
  } catch (data) {
    setMessage(data + '. Could not retrieve budget data.');
  }
  function getBackgroundColor(procent) {
    if (procent >= 80 && procent < 100) {
      return 'orange'
    } else if (procent > 100) {
      return 'red'
    }
  }
  if (data) {
    return (
      <div className='container'>
        <div>
        <div className="table-main">
          <h1>Aktuell Budget</h1>
          <h2>{data.budgetName}</h2>
          <h4>
            Total Budget: {data.totalSum} {' '}
            Used Budget: {data.usedAmount} {' '}
            Used Procent: {((parseInt(data.usedAmount) * 100) / parseInt(data.totalSum)).toFixed(2)} %
          </h4>
        </div>
          <table className="table-main">
            <tr className="table-row">
              <th className="table-header">Categories</th>
              {Object.keys(data.budgetCategories).map(x => <th className="table-header">{x}</th>)}
            </tr>
            <tr className="table-row">
              <th className="table-header">Cap</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell">{x[0]}</td>)}
            </tr>
            <tr className="table-row">
              <th className="table-header">Spent</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell">{x[1]}</td>)}
            </tr>
            <tr className="table-row">
              <th className="table-header">Amount Left</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell">{x[2]}</td>)}
            </tr>
            <tr className="table-row">
              <th className="table-header" >Used procent</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell" style={{ backgroundColor: getBackgroundColor(parseInt(x[3])) }}>{x[3]}</td>)}
            </tr>
          </table>
        </div>
        <DefaultRender errorMessage={errorMessage} />
      </div>
    );
  } else {
    return null;
  }
};
export default GetBudget;

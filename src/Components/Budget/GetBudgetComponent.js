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
        <h1>Lista Aktuell Budget</h1>
        <h2>{data.budgetName}</h2>
        <h4>
          Total Budget:{data.totalSum}
          Used Budget:{data.usedAmount}
          Used Procent:${((parseInt(data.usedAmount) * 100) / parseInt(data.totalSum)).toFixed(2)} %
        </h4>
        <div className='table-main'>
          <table className="table-main" style={{ backgroundColor: "white", border: "1px solid black" }}>
            <tr>
              <td>Categories</td>
              {Object.keys(data.budgetCategories).map(x => <td>{x}</td>)}
            </tr>
            <tr>
              <td>Cap</td>
              {Object.values(data.budgetCategories).map(x => <td>{x[0]}</td>)}
            </tr>
            <tr>
              <td>Spent</td>
              {Object.values(data.budgetCategories).map(x => <td>{x[1]}</td>)}
            </tr>
            <tr>
              <td>Amount Left</td>
              {Object.values(data.budgetCategories).map(x => <td>{x[2]}</td>)}
            </tr>
            <tr>
              <td>Used procent</td>
              {Object.values(data.budgetCategories).map(x => <td style={{ backgroundColor: getBackgroundColor(parseInt(x[3])) }}>{x[3]}</td>)}
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

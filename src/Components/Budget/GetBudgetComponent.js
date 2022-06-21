import { useState, useEffect } from 'react';
import API_Service from '../../API/API_Service.js';
import { DefaultRender } from '../Services/messageHandler.js';

const GetBudget = () => {
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [data, setData] = useState();

  try {
    useEffect(() => {
      const fetchData = async () => {
        const fetchresult = await API_Service.GetService('Budget');
        if (fetchresult !== null) {
          setData(fetchresult);
        }
        else {
          setMessage('Could not retrieve budget data.');
          setCounter(counter + 1);
          setTimer(4000);
        }
      };
      fetchData();
    }, [counter]);
  } catch {
    setMessage('Check connection to internet.');
    setCounter(counter + 1);
    setTimer(4000);
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
          {/* <div className="table-main"> */}
          <h1>Aktuell Budget</h1>
          <h2>{data.budgetName}</h2>
          <h4>
            Total Budget: {data.totalSum} {' '}
            Använd Budget: {data.usedAmount} {' '}
            Procent: {((parseInt(data.usedAmount) * 100) / parseInt(data.totalSum)).toFixed(2)} %
          </h4>
          {/* </div> */}
          <table className="table-main">
            <tr className="table-row">
              <th className="table-header">Kategorier</th>
              {Object.keys(data.budgetCategories).map(x => <th className="table-header">{x}</th>)}
            </tr>
            <tr className="table-row">
              <th className="table-header">Gräns</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell">{x[0]}</td>)}
            </tr>
            <tr className="table-row">
              <th className="table-header">Använt</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell">{x[1]}</td>)}
            </tr>
            <tr className="table-row">
              <th className="table-header">Belopp kvar</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell">{x[2]}</td>)}
            </tr>
            <tr className="table-row">
              <th className="table-header" >Procent</th>
              {Object.values(data.budgetCategories).map(x => <td className="table-cell" style={{ backgroundColor: getBackgroundColor(parseInt(x[3])) }}>{x[3]}</td>)}
            </tr>
          </table>
        </div>
        <DefaultRender errorMessage={errorMessage} counter={counter} timer={timer} />
      </div>
    );
  } else {
    return null;
  }
};
export default GetBudget;

import { GetCookie } from "../Services/cookie.js";
import { useState, useEffect } from 'react';
import API_Service from '../../API/API_Service.js';

const GetBudget = () => {
  const [data, setData] = useState();
  const [backgroundColor, setBackgroundColor] = UseState('white');
  useEffect(() => {
    const fetchData = async () => {
      const fetchresult = await API_Service.GetService('Budget');
      if (fetchresult != null){
        setData(fetchresult);
      } 
    };
    fetchData();
  }, []);
  console.log(data)
  if (data) {
    return (
      <div class='container'>
        <h1>Lista Aktuell Budget</h1>
        <h2>{data.budgetName}</h2>
        <h4>
          Total Budget:{data.totalSum} 
          Used Budget:{data.usedAmount}
          Used Procent:${((parseInt(data.usedAmount) * 100) / parseInt(data.totalSum)).toFixed(2)} %
      </h4>
        <div className='table'>
        <table style={{backgroundColor: "white", border: "1px solid black"}}>
          <tr>
            <td>Categories</td>
            {Object.keys(data.budgetCategories).map(x => <td>{x}</td>)}
          </tr>
          <tr>
            <td>Cap</td>
            {Object.values(data.budgetCategories).map(x =><td>{x[0]}</td>  )}
          </tr>
          <tr>
            <td>Spent</td>
            {Object.values(data.budgetCategories).map(x =><td>{x[1]}</td>  )}
          </tr>
          <tr>
            <td>Amount Left</td>
            {Object.values(data.budgetCategories).map(x =><td>{x[2]}</td>  )}
          </tr>
          <tr>
            <td>Used procent</td>
            {Object.values(data.budgetCategories).map(x =><td {true ? setBackgroundColor('orange'): false ? setBackgroundColor('red') : setBackgroundColor('white')} style={{backgroundColor: backgroundColor}}>{x[3]}</td>  )}
          </tr>
        </table>
        </div>
        <div id='errorDiv' class='errorMessage'></div>
      </div>
    );
  } else {
    return null;
  }
};
export default GetBudget;

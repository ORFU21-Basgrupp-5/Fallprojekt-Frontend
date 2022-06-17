import { useEffect, useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service.js';

const Budget = () => {
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState({
    name: '',
    totalSum: 0,
    date: '',
    month: '',
    year: '',
    categoriesAndAmount: {}
  })
  const [catData, setCatData] = useState({
    Food: 0,
    Car: 0,
    Subscriptions: 0,
    Clothes: 0,
    Treat: 0,
    Other: 0,
  })
  const [posted, setPosted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [disableSubmit, setdisableSubmit] = useState(true);
  const [sumLeft, setSumLeft] = useState();

  useEffect(() => {
    const catSum = Object.values(catData).map(Number).reduce(function (a, b) {
      return a + b;
    }, 0)
    setSumLeft(data.totalSum - catSum);

    if (sumLeft > 0 || sumLeft < 0) {
      setValidated(false);
      setdisableSubmit(true);
    }
    else if (sumLeft === 0) {
      if (posted === false) {
        setdisableSubmit(false);
        setValidated(true);
      }
    }
  }, [catData, data.totalSum, sumLeft, posted]);
  const handleFormChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };
  const handleCatChange = (e) => {
    setCatData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const uploadBudget = async (e) => {
    if (validated) {
      try {
        let postData = data;
        postData['month'] = new Date(postData.date).getMonth();
        postData['year'] = new Date(postData.date).getFullYear();
        delete postData['date'];
        postData['categoriesAndAmount'] = catData;
        const fetchresult = await API_Service.PostService("Budget", postData);
        if (fetchresult !== false) {
          setPosted(true);
          setdisableSubmit(true);
          DefaultRender("Your budget is saved!");
          setCounter(counter + 1);
        }
      }
      catch {
        setMessage('Upload failed!');
        setCounter(counter + 1);
      }
    }

  };

  return (
    <div className="container">
      <div id="budgetForm">
        <form id="form1" className='inputForm' onSubmit={handleSubmit}>
          <div className="inputRow">

            <label htmlFor="name">Budget name:</label>
            <input type="text" id="name" value={data.name} onChange={(event) => handleFormChange(event)} name="name" />
          </div>
          <div className="inputRow">
            <label htmlFor="totalSum">Budget total amount:</label>
            <input type="number" name='totalSum' id="totalSum" value={data.totalSum} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
            <p>Amount left to place: {sumLeft}</p>
          </div>
          <div className="inputRow">
            <label htmlFor="date">Budget date:</label>
            <input type="date" id="budgetDate" name="date" value={data.date} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
            <label htmlFor="">Budget categories:</label>
          </div>
          <div className="inputRow">
            <label htmlFor="Food">Food:</label>
            <input type="number" name="Food" value={catData.Food} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
            <label htmlFor="Car">Car:</label>
            <input type="number" name="Car" value={catData.Car} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
            <label htmlFor="Subscriptions">Subscriptions:</label>
            <input type="number" name="Subscriptions" value={catData.Subscriptions} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
            <label htmlFor="Clothes">Clothes:</label>
            <input type="number" name="Clothes" value={catData.Clothes} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
            <label htmlFor="Treat">Treat:</label>
            <input type="number" name="Treat" value={catData.Treat} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
            <label htmlFor="Other">Other:</label>
            <input type="number" name="Other" value={catData.Other} onChange={(event) => handleCatChange(event)} />
          </div>


        </form>
        <button className="submit_button" id="budgetSumbit" disabled={disableSubmit ? true : false} onClick={uploadBudget}>Submit</button>
      </div>
      <DefaultRender errorMessage={errorMessage} counter={counter} />
    </div>

  );
}
export default Budget;

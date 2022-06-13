import { useState} from 'react';
import { DefaultRender } from '../Services/errorHandler.js';
import API_Service from '../../API/API_Service.js';

const Budget = () => {
  const [data,setData] = useState({
    name: '',
    totalSum: 0,
    date:'',
    month: '',
    year: '',
  })
  const [catData,setCatData] = useState({
    
      Food:0,
      Car:0,
      Subscriptions:0,
      Clothes:0,
      Treat:0,
      Other:0,
      sumLeft:0,
     })
  const [posted,setPosted] = useState(false);
  const [validated,setValidated] = useState(false);
  const [disableSubmit,setdisableSubmit] = useState(true);

  const handleFormChange = (e) => {
    
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    calulateTotalCat();
   
	};
  const handleCatChange = (e) => {
    setCatData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    calulateTotalCat();

    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const calulateTotalCat = () => {
    let tempCat = catData;
    var categoriesvalues = Object.values(tempCat);
      var categoriesValuesInt = categoriesvalues.map(Number);
      var testBelop = categoriesValuesInt.reduce(function (a, b) {
        return a + b;
      }, 0)
      let test2 = testBelop - tempCat.sumLeft;
      let test = data.totalSum - test2;
      tempCat.sumLeft = test;
      setCatData(tempCat);

     if (test > 0) {
      
      setValidated(false);
      setdisableSubmit(true);
    }
    else if (test === 0)
     {
       if(posted === false)
       {
      setdisableSubmit(false);
      setValidated(true);
       }
     }

    }
  
    
  const uploadBudget = async (e) => {
      if(validated){
        try {
          let postData = data;
      const fetchresult =  await API_Service.PostService("Budget", postData);
      if (fetchresult !== false)
      {
        setPosted(true);
        setdisableSubmit(true);
        DefaultRender("Your budget is saved!");
      }
        }
        catch (error) {
          DefaultRender('Upload failed!');
        }
      }

  };

  return (
    <div className="container">
      <div id="budgetForm">
      <form id="form1" className='inputForm' onSubmit={handleSubmit}>
        <div className="inputRow">
          
          <label for="budgetName">Budget name:</label>
          <input type="text" id="budgetName" value={data.usnameerName} onChange={(event) => handleFormChange(event)} name="budgetName"/>
          </div>
          <div className="inputRow">
          <label for="totalSum">Budget total amount:</label>
          <input type="number" name='totalSum' id="totalSum" value={data.totalSum} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
            <p>Amount left to place: {catData.sumLeft}</p>
            </div>
                    <div className="inputRow">
          <label for="date">Budget date:</label>
          <input type="date" id="budgetDate" name="date" value={data.date} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
          <label for="">Budget categories:</label>
          </div>
          <div className="inputRow">
          <label for="Food">Food:</label>
          <input type="number" name="Food" value={catData.Food} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Car">Car:</label>
          <input type="number" name="Car" value={catData.Car} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Subscriptions">Subscriptions:</label>
          <input type="number" name="Subscriptions"value={catData.Subscriptions} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Clothes">Clothes:</label>
          <input type="number" name="Clothes"value={catData.Clothes} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Treat">Treat:</label>
          <input type="number" name="Treat"value={catData.Treat} onChange={(event) => handleCatChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Other">Other:</label>
          <input type="number" name="Other"value={catData.Other} onChange={(event) => handleCatChange(event)} />
          </div>
          
          
      </form>
      <button className="submit_button" id="budgetSumbit" disabled={disableSubmit ? true : false} onClick={uploadBudget}>Submit</button>
    </div>
    <div id="errorDiv" className="errorMessage"></div>
  </div>

    );
}
export default Budget;

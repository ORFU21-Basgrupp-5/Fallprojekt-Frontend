import { GetCookie } from "../Services/cookie.js";
import API_Service from "../../API/API_Service.js";
import { DefaultRender } from "../Services/errorHandler.js";

const Budget = () => {
  const [data,setData] = useState({
    name: '',
    totalSum: 0,
    date:'',
    month: '',
    year: '',
    categoriesAndAmount: {
      Food:0,
      Car:0,
      Subscriptions:0,
      Clothes:0,
      Treat:0,
      Other:0,
    }
  })
  const [validated,setValidated] = useState(false);
  const [disableSubmit,setdisableSubmit] = useState(true);
  const [sumLeft,setSumLeft] = useState(0);
  const handleFormChange = (e) => {
    
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if(e.target.name === 'totalSum')
    setData((prev) => ({ ...prev, [sumToAdd]: e.target.value }));
    calculateTotal();
	};
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const calculateTotal = () => {
    let tempSums = data;
    let tempSumLeft = sumLeft;
    var categoriesvalues = Object.values(tempSums.categoriesAndAmount);
      var categoriesValuesInt = categoriesvalues.map(Number);
      var testBelop = categoriesValuesInt.reduce(function (a, b) {
        return a + b;
      }, 0)
      tempSumLeft -= testBelop;
      setSumLeft(tempSumLeft);


    if (tempSumLeft > tempSums.totalSum) {
      alert("warning test");
      setValidated(false);
      setdisableSubmit(true);
    }
    else if (tempSums.sumToAdd === tempSums.totalSum)
     {
       if(Posted === false)
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
        setPosted = true;
        setdisableSubmit = true;
        defaultRender("Your budget is saved!");
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
            <p>Amount left to place: {sumLeft}</p>
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
          <input type="number" name="Food" value={data.categoriesAndAmount.Food} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Car">Car:</label>
          <input type="number" name="Car" value={data.categoriesAndAmount.Car} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Subscriptions">Subscriptions:</label>
          <input type="number" name="Subscriptions"value={data.categoriesAndAmount.Subscriptions} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Clothes">Clothes:</label>
          <input type="number" name="Clothes"value={data.categoriesAndAmount.Clothes} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Treat">Treat:</label>
          <input type="number" name="Treat"value={data.categoriesAndAmount.Treat} onChange={(event) => handleFormChange(event)} />
          </div>
          <div className="inputRow">
          <label for="Other">Other:</label>
          <input type="number" name="Other"value={data.categoriesAndAmount.Other} onChange={(event) => handleFormChange(event)} />
          </div>
          
          
      </form>
      <button className="submit_button" id="budgetSumbit" disabled={disableSubmit ? true : false} onClick={uploadBudget}>Submit</button>
    </div>
    <div id="errorDiv" className="errorMessage"></div>
  </div>

    );
}
export default Budget;

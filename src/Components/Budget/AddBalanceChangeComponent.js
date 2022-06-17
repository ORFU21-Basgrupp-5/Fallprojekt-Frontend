import { GetCookie } from "../Services/cookie.js"
import { useState, useEffect } from 'react';
import { DefaultRender } from "../Services/messageHandler";
import API_Service from "../../API/API_Service.js";

const AddBalanceChange  = () => {
  const [category, setCategory] = useState();
  const [type, setType] = useState ("Income");
  const [data, setData] = useState({
    AccountId : "",
    Description: "",
    Date: "",
    BalanceChange: "",
    Category: 0,
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const fetchresult = await API_Service.GetService(type + '/categories');
        if (fetchresult != null) {
          setCategory(fetchresult);
        }
      }
      fetchData();
    } 
    catch (data) {
      console.log(data + '. Could not retrieve budget data.');
    }
  },[type]);
  
  const handleIncomeFormChange = (e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
  const handleSelectChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.selectedIndex }));
  }
  const handleTypeChange = (e) => {
		setType(e.target.value);
	};

const uploadChange = async (e) => {
  e.preventDefault();
  const post = {};
  for (const [key, value] of Object.entries(data)) {
    (key === 'AccountId') ? post[key] = parseInt(value) 
    : (key === 'BalanceChange') ? post[type.toLowerCase() + key] = parseInt(value)
    : post[type.toLowerCase() + key] = value;
  }
  try {
    const incomeResult = await API_Service.PostService(type, post);
    if(incomeResult !== false) {
      //setData(incomeResult)
    }
  } catch (e) {
    DefaultRender('something went wrong');
  }
}

return (
  <div className="container">
    <div id="errorDiv"></div>
      <form className="form-main">
      <h1>Add Balance change</h1>
        <div>
          <label className="label-main">Type</label>
        </div>
        <select onChange={(event) => handleTypeChange(event)}>
          <option value="Income" >Income</option>
          <option value="Expense">Expense</option>
        </select>
        <div>
          <label className="label-main">Category</label>
        <select name="Category" onChange={(event) => handleSelectChange(event)}>
          {category?.map(x => <option>{x}</option>)}
        </select>
        </div>
        <div className="input-wrapper">
          <label className="label-main" htmlFor="BalanceChange">Balance</label>
          <input
          className="input-main"
          type="number"
          id="BalanceChange"
          name="BalanceChange"
          value={data.BalanceChange}
          onChange={(event) => handleIncomeFormChange(event)}   
          />
        </div>
        <div className="input-wrapper">
          <label className="label-main" htmlFor="Account">Account</label>
          <input 
          className="input-main"
          type="number"
          name="AccountId"
          value={data.AccountId}
          onChange={(event) => handleIncomeFormChange(event)}
          />
        </div>
        <div className="input-wrapper">
          <label className="label-main" htmlFor="Description">Description</label>
          <input 
          className="input-main"
          type="text"
          name="Description"
          value={data.Description}
          onChange={(event) => handleIncomeFormChange(event)}
          />
        </div>
        <div className="input-wrapper">
          <label className="label-main" htmlFor="Date">Date</label>
          <input
          className="input-main"
          name="Date" 
          type="date"
          value={data.Date}
          onChange={(event) => handleIncomeFormChange(event)}         
           />
        </div>
        <div>
          <button className="btn-main" onClick={uploadChange}>Enter</button>
        </div>
        <div id="info-income"></div>
      </form>
  </div>
);

}
export default AddBalanceChange
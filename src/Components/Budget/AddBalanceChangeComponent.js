import { useState, useEffect } from 'react';
import { DefaultRender } from "../Services/messageHandler";
import API_Service from "../../API/API_Service.js";
import { FaSpinner } from 'react-icons/fa';

const AddBalanceChange  = () => {
  const [loading, setLoading] = useState(false);
  const [disableSubmit, setdisableSubmit] = useState(true);
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [category, setCategory] = useState();
  const [accounts, setAccounts] = useState();
  const [type, setType] = useState("Income");
  const [data, setData] = useState({
    AccountId: "",
    Description: "",
    Date: "",
    BalanceChange: "",
    Category: 0,
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true)
        const fetchresult = await API_Service.GetService(type + '/categories');
        const res = await API_Service.GetService('Account');
        console.log(res)
        if (fetchresult !== null && res !== null) {
          setCategory(fetchresult);
          setAccounts(res);
          data.AccountId = res[0].id;
        }
      }
      fetchData();
    }
    catch (data) {
      setMessage('Could not load categories.');
      setCounter(counter + 1);
      setTimer(4000);
    }
    finally{
      setLoading(false)
    }
  },[type, data, counter]);
  
  const handleFormChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSelectChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.selectedIndex }));
  }
  // const handleAccountChange = (e) => {
  //   setData((prev) => ({ ...prev, [e.target.name]: e.target.id }));
  // }
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const uploadChange = async (e) => {
    e.preventDefault();
    const post = {};
    for (const [key, value] of Object.entries(data)) {
      if(key === 'AccountId'){
        post[key] = value
      }
      else if (key === 'BalanceChange'){
        post[type.toLowerCase() + key] = parseInt(value)
      }

      else {
        post[type.toLowerCase() + key] = value;
      }
    }
    console.log('post' + Object.entries(post))
    try {
      setLoading(true)
      const result = await API_Service.PostService(type, post);
      if (result !== false) {
        setMessage('Utgift/inkomst lades till');
        setCounter(counter + 1);
        setTimer(2000);
      }
      else {
        setMessage('Något gick fel');
        setCounter(counter + 1);
        setTimer(2000);
      }
    } catch (e) {
      setMessage('Kunde inte ansluta, kolla din internetåtkomst');
      setCounter(counter + 1);
      setTimer(4000);
    }
   
  finally{
    setLoading(false)
  }
}

return (
  <div className="container">
    <h1 className="text-white mb-10">Add Balance change</h1>
    <div id="errorDiv"></div>
      <form className="form-main">
        <div>
          <label className="label-main">Type</label>
        </div>
        <select  className="input-main"  onChange={(event) => handleTypeChange(event)}>
          <option value="Income" >Income</option>
          <option value="Expense">Expense</option>
        </select>
        <div>
          <label className="label-main">Category</label>
        <select className="input-main"   name="Category" onChange={(event) => handleSelectChange(event)}>
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
  <DefaultRender errorMessage={errorMessage} counter={counter} />
  </div>
);

}
export default AddBalanceChange
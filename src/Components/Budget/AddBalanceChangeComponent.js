import { useState, useEffect } from 'react';
import { DefaultRender } from "../Services/messageHandler";
import API_Service from "../../API/API_Service.js";

const AddBalanceChange = () => {
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
  }, [type, data, counter]);

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
      if (key === 'BalanceChange') post[type.toLowerCase() + key] = parseInt(value)
      else post[type.toLowerCase() + key] = value;
    }
    console.log('post' + Object.entries(post))
    try {
      const result = await API_Service.PostService(type, post);
      if (result !== false) {
        setMessage('Balance Added');
        setCounter(counter + 1);
        setTimer(2000);
      }
    } catch {
      setMessage('something went wrong');
      setCounter(counter + 1);
      setTimer(4000);
    }
  }

  return (
    <div className="container">
      <div>
        <h1 className="mb-10">Lägg till Inkomst/Utgift</h1>
        <form className="form-main">

          <div>
            <label className="label-main">Typ</label>
          </div>
          <select onChange={(event) => handleTypeChange(event)}>
            <option value="Income" >Inkomst</option>
            <option value="Expense">Utgift</option>
          </select>
          <div>
            <label className="label-main">Kategori</label>
            <select name="Category" onChange={(event) => handleSelectChange(event)}>
              {category?.map(x => <option>{x}</option>)}
            </select>
          </div>
          <div className="input-wrapper">
            <label className="label-main" htmlFor="BalanceChange">Belopp</label>
            <input
              className="input-main"
              type="number"
              id="BalanceChange"
              name="BalanceChange"
              value={data.BalanceChange}
              onChange={(event) => handleFormChange(event)}
            />
          </div>
          <div className="input-wrapper">
            <label className="label-main" htmlFor="AccountId">Konto</label>
            <select name="AccountId" value={data.AccountId} onChange={(event) => handleFormChange(event)}>
              {accounts?.map(x => <option value={x.id}>{x.name}</option>)}
            </select>
          </div>
          <div className="input-wrapper">
            <label className="label-main" htmlFor="Description">Beskrivning</label>
            <input
              className="input-main"
              type="text"
              name="Description"
              value={data.Description}
              onChange={(event) => handleFormChange(event)}
            />
          </div>
          <div className="input-wrapper">
            <label className="label-main" htmlFor="Date">Datum</label>
            <input
              className="input-main"
              name="Date"
              type="date"
              value={data.Date}
              onChange={(event) => handleFormChange(event)}
            />
          </div>
          <div>
            <button className="btn-main" onClick={uploadChange}>Enter</button>
          </div>
          <div id="info-income"></div>
        </form>
        <DefaultRender errorMessage={errorMessage} counter={counter} timer={timer} />
      </div>
    </div>
  );

}
export default AddBalanceChange
import { useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service';
import { FaSpinner } from 'react-icons/fa';


const RecoverEmail = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [formValue, setFormValue] = useState({
    email: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const post = formValue;
    try {
      setLoading(true)
      const fetchresult = await API_Service.PostService('User/recover', post);
      if (fetchresult !== false) {
        // DefaultRender(fetchresult);
        // return true;
        return fetchresult;
      }
    } catch (e) {
      setMessage("Something went wrong");
      setCounter(counter + 1);
      setTimer(4000);
    }
    finally{
      setLoading(false)
    }
  }


  return (
    <div className="container">
<<<<<<< HEAD
    <form className="form-main">
      <div className="input-wrapper">
        <label className="label-main" htmlFor="Email">Email </label>
        <input
        className="input-main"
        type="text"
        name="email"
        placeholder="Fyll i din epost"
        value={formValue.email}
        onChange={handleChange}
        />
      </div>
      <button className="btn-main" onClick={sendEmail}>Bekräfta
      {loading &&
							<span className='animate-spin h-5 w-5 ml-3 inline-block'>
							<FaSpinner/>
							</span>}</button>
      <div id="SentOrNotDiv"></div>
      <DefaultRender errorMessage={errorMessage} counter={counter} />
    </form>
=======
      <form className="form-main">
        <div className="input-wrapper">
          <label className="label-main" htmlFor="Email">Email </label>
          <input
            className="input-main"
            type="text"
            name="email"
            placeholder="Fyll i din epost"
            value={formValue.email}
            onChange={handleChange}
          />
        </div>
        <button className="btn-main" onClick={sendEmail}>Bekräfta</button>
        <div id="SentOrNotDiv"></div>
        <DefaultRender errorMessage={errorMessage} counter={counter} timer={timer} />
      </form>
>>>>>>> e005d9759b6a831c995c8249e5c013e05e655cc4
    </div>
  )

}
export default RecoverEmail;









import { useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service';


const RecoverEmail = () => {
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
  }


  return (
    <div className="container">
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
    </div>
  )

}
export default RecoverEmail;









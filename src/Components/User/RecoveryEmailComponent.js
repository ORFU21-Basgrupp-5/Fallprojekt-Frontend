import { GetCookie } from "../Services/cookie";
import { useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service';


const RecoverEmail = () => {
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
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

  let handleSubmit = (event) => {
    event.preventDefault();
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const post = formValue;
    try {
      const fetchresult = await API_Service.PostService('User/SendRecoveryEmail', post);
      if (fetchresult !== false) {
        // DefaultRender(fetchresult);
        // return true;
        return fetchresult;
      }
    } catch (e) {
      setMessage("Something went wrong");
      setCounter(counter + 1);
    }
  }


  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="Email">Email: </label>
      <input
        type="text"
        name="email"
        placeholder="Enter your email address"
        value={formValue.email}
        onChange={handleChange}
      />

      <button id="recoverbutton" onClick={sendEmail}>Bekräfta</button>
      <div id="SentOrNotDiv"></div>
      <DefaultRender errorMessage={errorMessage} counter={counter} />
    </form>
  )

}
export default RecoverEmail;









import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from "../../API/API_Service";

const ChangePassword = () => {
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [inputFields, setInputFields] = useState({
    newPassword: '',
    confirmPassword: ''
  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setInputFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function checkPassword(e) {
    e.preventDefault();
    if (inputFields.newPassword === inputFields.confirmPassword) {
      ChangePasswordLink(inputFields);
    }
    else {
      setMessage("Lösenorden matchar inte");
      setCounter(counter + 1);
      setTimer(4000);
    }
  }

  async function ChangePasswordLink(NewPasswordDTO) {
    const fetchresult = await API_Service.PutService(
      'User/recover',
      NewPasswordDTO
    );

    if (fetchresult !== false) {
      setMessage('Bytt lösenord!');
      setCounter(counter + 1);
      setTimeout(moveToLoging, 2000);
      function moveToLoging() {
        window.location.hash = "#/login";
      }
    } else {
      setMessage('Kunde inte ändra lösenord');
      setCounter(counter + 1);
      setTimer(4000);
    }
  }



  return (
    <div className='container'>
      <form className="form-main">
        <div className="input-wrapper">
          <label className="label-main">Nytt lösenord: </label>
          <input
            className="input-main"
            type="text"
            id="newPassword"
            name="newpassword"
            value={inputFields.newPassword}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="input-wrapper">
          <label className="label-main">Bekräfta lösenord: </label>
          <input
            className="input-main"
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            value={inputFields.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className="btn-main" id="confirmButton" onclick={checkPassword}>Bekräfta</button>
        <br />
        <div className='label-linkwrap'>
          <p className="label-main">
            <NavLink className="menu-textlink" to='/login'>
              Logga in här
            </NavLink>
          </p>
        </div>
        <DefaultRender errorMessage={errorMessage} counter={counter} timer={timer} />
      </form>
    </div>
  )
}

export default ChangePassword;
import { GetCookie } from "../Services/cookie";
import { useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from "../../API/API_Service";

const ChangePassword = () => {
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [inputFields, setInputFields] = useState({
    NewPassword: '',
    ConfirmPassword: ''
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
    if (inputFields.newPassword.value === inputFields.confirmPassword.value) {
      const NewPasswordDTO = {
        NewPassword: inputFields.newPassword.value,
        ConfirmPassword: inputFields.confirmPassword.value
      };
      ChangePasswordLink(NewPasswordDTO)
    }
    else {
      setMessage("Lösenorden matchar inte");
      setCounter(counter + 1);
    }
  }

  async function ChangePasswordLink(NewPasswordDTO) {
    const fetchresult = await API_Service.PutService(
      'User/recover',
      NewPasswordDTO
    );
    console.log(fetchresult);
    if (fetchresult != false) {
      setMessage('Changed password successfully');
      setCounter(counter + 1);
      setTimeout(moveToLoging, 2000);
      function moveToLoging() {
        window.location.hash = "#/login";
      }
    } else {
      setMessage('Could not change password');
      setCounter(counter + 1);
    }
  }



  return (
    <form>
      <label>New password: </label>
      <input
        type="text"
        id="newPassword"
        name="newpassword"
        value={inputFields.NewPassword}
        onChange={handleChange}
      />
      <br />
      <label>Confirm password: </label>
      <input
        type="text"
        id="confirmPassword"
        name="confirmPassword"
        value={inputFields.ConfirmPassword}
        onChange={handleChange}
      />
      <button id="confirmButton" onclick={checkPassword}>Confirm</button>
      <br />
      <a href="/">Login here!</a>
      <DefaultRender errorMessage={errorMessage} counter={counter} />
    </form>
  )
}

export default ChangePassword;
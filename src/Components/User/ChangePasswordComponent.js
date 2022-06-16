import { GetCookie } from "../Services/cookie";
import { useState} from 'react';
import { DefaultRender } from "../Services/errorHandler";
import API_Service from "../../API/API_Service";

  const ChangePassword = () => {
    const [inputFields, setInputFields] = useState({
      NewPassword: '',
      ConfirmPassword: ''
    });
  
    
  const HandleChange = (e) => {
    const {name, value} = e.target;
    
    setInputFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
  
  function checkPassword (e) {
    e.preventDefault();
    if (inputFields.newPassword.value===inputFields.confirmPassword.value) {
      const NewPasswordDTO = {
          NewPassword: inputFields.newPassword.value,
          ConfirmPassword: inputFields.confirmPassword.value
      };
      ChangePasswordLink(NewPasswordDTO)
      }
      else{
      DefaultRender("Lösenorden matchar inte")
      }
  }
  
    async function ChangePasswordLink(NewPasswordDTO) {
      const fetchresult = await API_Service.PutService(
        'User/recover',
        NewPasswordDTO
        );
        console.log(fetchresult);
        if (fetchresult != false) {
          DefaultRender('Changed password successfully');
          setTimeout(moveToLoging, 2000);
        function moveToLoging() {
          window.location.hash = "#/login";
        }
      } else {
        DefaultRender('Could not change password');
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
      onChange={HandleChange}
      />
      <br/>
      <label>Confirm password: </label>
      <input
       type="text"
       id="confirmPassword"
       name="confirmPassword"
       value={inputFields.ConfirmPassword}
       onChange={HandleChange}
       />
      <button id="confirmButton" onclick={checkPassword}>Confirm</button>
      <br/>
      <a href="/">Login here!</a>
      <div id="errorDiv"></div>
    </form>
    ) 
}

export default ChangePassword;
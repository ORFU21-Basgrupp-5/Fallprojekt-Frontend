import { GetCookie } from "../cookie";
import { useState} from 'react';
import { DefaultRender } from "../errorHandler";
import API_Service from "../../API/API_Service";

  const changePassword = () => {
    const [inputFields, setInputFields] = useState({
      NewPassword: '',
      ConfirmPassword: ''
    });
  
    
  const handleChange = (e) => {
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
    if (newPassword.value===confirmPassword.value) {
      const NewPasswordDTO = {
          NewPassword: newPassword.value,
          ConfirmPassword: confirmPassword.value
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
      onChange={handleChange}
      />
      <br/>
      <label>Confirm password: </label>
      <input
       type="text"
       id="confirmPassword"
       name="confirmPassword"
       value={inputFields.ConfirmPassword}
       onChange={handleChange}
       />
      <button id="confirmButton" onclick={checkPassword}>Confirm</button>
      <br/>
      <a href="/">Login here!</a>
      <div id="errorDiv"></div>
    </form>
    ) 
}

export default changePassword
import { GetCookie } from "./cookie.js.js";
import { DefaultRender } from "./errorHandler.js.js";
import API_Service from "/users/erikw/onedrive/programmering/skola/fallprojekt/fallprojektfrontend/fallprojekt-frontend/src/api/api_service.js";

  const changePassword = () => {
    const [inputFields, setInputFields] = useState({
      password: '',
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
    };

    const passwordMatch = async (e) => {
      e.preventDefault()
      if (newPassword.value===confirmPassword.value) {
        const NewPasswordDTO = {
            NewPassword: newPassword.value,
            ConfirmPassword: confirmPassword.value
        };
        ChangePasswordLink(NewPasswordDTO)
        }
        else{
        DefaultRender("Passwords do not match")
        }
    } 
 

    // changeButton.onclick = function (e) {
    //     e.preventDefault()
    //     if (newPassword.value===confirmPassword.value) {
    //     const NewPasswordDTO = {
    //         NewPassword: newPassword.value,
    //         ConfirmPassword: confirmPassword.value
    //     };
    //     ChangePasswordLink(NewPasswordDTO)
    //     }
    //     else{
    //     DefaultRender("Passwords do not match")
    //     }  
    // }

    const ChangePasswordLink = async (e) => {
      e.preventDefault();     
      const put = inputFields;
      try {
        const recoverPass = await API_Service.PutService('User/recover', put);

        if (recoverPass === true) {
          DefaultRender("Password changed successfully");
          return true;
        }
      } catch (e) {
        DefaultRender("Password do not match")
      }
    }

    // async function ChangePasswordLink(emailrecdto) {
    
    //     const recoverPass = await fetch(
    //       "http://localhost:7151/User/recover",
    //       {
    //         method: "put",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: "Bearer " + token
    //         },
    //         body: JSON.stringify(emailrecdto)
    //       }
    //     ).then((response) => {
    //       if (response.ok) {
    //         DefaultRender("Password changed successfully")
    //         return true;
    //       } else {
    //         DefaultRender("Could not change password")
    //         // throw new Error("NETWORK RESPONSE ERROR");
    //       }
    //     });
    // }

    return (
      <form >
      <label>New password: </label>
      <input 
      id="newPassword"
      name="newpassword"
      value={inputFields.password}
      onChange={handleChange}
      />
      <br/>
      <label>Confirm password: </label>
      <input
       id="confirmPassword"
       name="confirmPassword"
       value={inputFields.ConfirmPassword}
       onChange={handleChange}
       />
      <button id="confirmButton" onclick={passwordMatch}>Confirm</button>
      <br/>
      <a href="/">Login here!</a>
      <div id="errorDiv"></div>
    </form>
    ) 
}

export default changePassword
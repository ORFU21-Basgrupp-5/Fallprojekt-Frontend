import { GetCookie } from "../Services/cookie.js";
import { DefaultRender } from "../Services/errorHandler.js";

const ChangePassword = (root, token) => {
  root.innerHTML = "";


  const html = `
              <form>
                <label>New password: </label>
                <input id="newPassword">
                <br>
                <label>Confirm password: </label>
                <input id="confirmPassword">
                <button id="confirmButton">Confirm</button>
                <br>
                <a href="/">Login here!</a>
                <div id="errorDiv"></div>
              </form>
              `
  root.innerHTML = html;

  const confirmPassword = document.getElementById("confirmPassword")
  const newPassword = document.getElementById("newPassword")
  let changeButton = document.getElementById("confirmButton")

  changeButton.onclick = function (e) {
    e.preventDefault()
    if (newPassword.value === confirmPassword.value) {
      const NewPasswordDTO = {
        NewPassword: newPassword.value,
        ConfirmPassword: confirmPassword.value
      };
      ChangePasswordLink(NewPasswordDTO)
    }
    else {
      DefaultRender("Passwords do not match")
    }

  }
  async function ChangePasswordLink(emailrecdto) {

    const recoverPass = await fetch(
      "http://localhost:7151/User/recover",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(emailrecdto)
      }
    ).then((response) => {
      if (response.ok) {
        DefaultRender("Password changed successfully")
        return true;
      } else {
        DefaultRender("Could not change password")
        // throw new Error("NETWORK RESPONSE ERROR");
      }
    });
  }
}
export default ChangePassword;
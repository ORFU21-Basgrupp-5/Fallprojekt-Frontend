import API_Service from "/services/API_Service.js";
import { defaultRender } from "/services/errorHandler.js";
import { setCookie } from "/services/cookie.js";

let ChangePassword = {
    render: async () => {
        let view = `
        <div class="container">
          <form class="inputForm">
            <label>Nytt lösenord: </label>
            <input id="newPassword">
            <br>
            <label>Bekräfta lösenord: </label>
            <input id="confirmPassword">
            <button class="submit_button" id="confirmButton">Bekräfta</button>
            <br>
            <a href="/">Logga in här</a>
            <div id="errorDiv" class="errorMessage"></div>
          </form>
        </div>
        `;

        return view;
    },
    after_render: async () => {
      const confirmPassword = document.getElementById('confirmPassword')
    const newPassword = document.getElementById('newPassword')
    let ChangeButton = document.getElementById('confirmButton')

    ChangeButton.onclick = function (e) {
        e.preventDefault()
        if (newPassword.value===confirmPassword.value) {
        const NewPasswordDTO = {
            NewPassword: newPassword.value,
            ConfirmPassword: confirmPassword.value
        };
        ChangePasswordLink(NewPasswordDTO)
        }
        else{
        defaultRender("Lösenorden matchar inte")
        }
    
    }
    async function ChangePasswordLink(emailrecdto) {
    
        const recoverPass = await fetch(
          "http://localhost:7151/api/User/recover",
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
            defaultRender("Changed password successfully")
            return true;
          } else {
            defaultRender("Could not change password")
            // throw new Error("NETWORK RESPONSE ERROR");
          }
        });
    }
    },
};

export default ChangePassword;

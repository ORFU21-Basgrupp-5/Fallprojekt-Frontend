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
    async function ChangePasswordLink(NewPasswordDTO) {
        const fetchresult = await API_Service.PutService(
          'User/recover',
          NewPasswordDTO
        );
        console.log(fetchresult);
        if (fetchresult != false) {
          defaultRender('Changed password successfully');
          setTimeout(moveToLoging, 2000);
          function moveToLoging() {
            window.location.hash = "#/login";
          }
        } else {
          defaultRender('Could not change passwor');
        }
      }

    },
};

export default ChangePassword;

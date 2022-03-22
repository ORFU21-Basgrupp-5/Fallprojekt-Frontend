import { getCookie } from "./cookie.js";

export const render = (root,token) => {
    root.innerHTML = "";


    const html = `
              <form>
                <label>Nytt lösenord: </label>
                <input id="newPassword">
                <br>
                <label>Bekräfta lösenord: </label>
                <input id="confirmPassword">
                <button id="confirmButton">Bekräfta</button>
                <br>
                <a href="/">Logga in här</a>
                <div id="errorDiv"></div>
              </form>
              `
    root.innerHTML = html;
    
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
        console.log("Lösenorden matchar inte")
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
            alert("Changed password successfully");
            return true;
          } else {
            alert("Could not change password")
            // throw new Error("NETWORK RESPONSE ERROR");
          }
        });
    }
}
import { GetCookie } from "./cookie.js";
import { DefaultRender } from "./errorHandler.js";
export const Render = (root) => {
  root.innerHTML = "";

const emailform = ` 
  <form>
    <h1>Recover</h1>
    <div class="input">
    <label for="Email">Email </label>
    <br>
    <input id= "Email" placeholder="Fyll i din email"><br>
    </div>
    <button id= "recoverbutton">Bekräfta</button>
    <div id="SentOrNotDiv"></div>
    <a href="/">Logga in här</a>
  </form>`
root.innerHTML = emailform

let sendButton = document.getElementById("recoverbutton")
let sentOrNotDiv = document.getElementById("SentOrNotDiv")
let email = document.getElementById("Email")


  sendButton.onclick = function (e) {
    e.preventDefault()
    const EmailDTO = {
      Email: email.value
    };
    SendRecoveryEmail(EmailDTO);
  }

  async function SendRecoveryEmail(emailrecdto) {
    
    const recoverPass = await fetch(
      "http://localhost:7151/User/SendRecoveryEmail",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailrecdto)
      }
    ).then((response) => {
      if (response.ok) {
        DefaultRender("Email sent.");
        return true;
      } else {
        return response.text().then(function(text) 
      {
        DefaultRender(`${response.status} ${response.statusText} ${text}`);
      })
      }
    })
    .catch((error) => {
      DefaultRender(`Error: ${error.message} `);
    });
  }
}









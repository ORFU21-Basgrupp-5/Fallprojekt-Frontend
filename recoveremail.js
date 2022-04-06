import { GetCookie } from "./cookie.js";
export const Render = (root) => {
  root.innerHTML = "";

const emailform = ` 
  <form>
    <label>Email: </label>
    <input id= "Email" >
    <button id= "recoverbutton">Bekräfta</button>
    <div id="SentOrNotDiv"></div>
    <a href="/">Logga in här</a>
    <div id="errorDiv"></div>
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
        RecoveryMessege("Email sent.");
        return true;
      } else {
        return response.text().then(function(text) 
      {
        RenderError(`${response.status} ${response.statusText} ${text}`);
      })
      }
    })
    .catch((error) => {
      RenderError(`Error: ${error.message} `);
    });
  }

  function RecoveryMessege(string){
    sentOrNotDiv.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode(string))
      );
      setTimeout(function () {
        sentOrNotDiv.removeChild(sentOrNotDiv.lastChild);
      }, 2000);
  }

  function RenderError(string){
    sentOrNotDiv.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode(string))
      );
      setTimeout(function () {
        sentOrNotDiv.removeChild(sentOrNotDiv.lastChild);
      }, 2000);
  }
}









import { getCookie } from "./cookie.js";
export const render = (root) => {
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

let SendButton = document.getElementById("recoverbutton")
let SentOrNotDiv = document.getElementById("SentOrNotDiv")
let Email = document.getElementById("Email")


  SendButton.onclick = function (e) {
    e.preventDefault()
    const EmailDTO = {
      Email: Email.value
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
        renderError(`${response.status} ${response.statusText} ${text}`);
      })
      }
    })
    .catch((error) => {
      renderError(`Error: ${error.message} `);
    });
  }

  function RecoveryMessege(string){
    SentOrNotDiv.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode(string))
      );
      setTimeout(function () {
        SentOrNotDiv.removeChild(SentOrNotDiv.lastChild);
      }, 2000);
  }

  function renderError(string){
    SentOrNotDiv.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode(string))
      );
      setTimeout(function () {
        SentOrNotDiv.removeChild(SentOrNotDiv.lastChild);
      }, 2000);
  }
}









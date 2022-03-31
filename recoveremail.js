import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";

const emailform = ` 
<div id="recoveremail">
    <form>
        <label>Email: </label>
        <input id= "Email" >
        <button id= "recoverbutton">Bekräfta</button>
        <div id="SentOrNotDiv"></div>
        <a href="/">Logga in här</a>
        <div id="errorDiv"></div>
      </form>
</div>
<div id="picture">
  <img src="https://d6f6d0kpz0gyr.cloudfront.net/uploads/transforms/bc9e33244d2d8a7bebbefa89bb319b9f/312172/method-design-madebyshape_6c0c164bd2b597ee32b68b8b5755bd2e.webp" alt="">
</div>`
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
        renderError(`${response.status} ${response.statusText} ${text}`);
      })
      }
    })
    .catch((error) => {
      renderError(`Error: ${error.message} `);
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

  function renderError(string){
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









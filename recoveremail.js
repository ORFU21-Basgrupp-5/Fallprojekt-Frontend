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
        DefaultRender("Email sent.");
        return true;
      } else {
        return response.text().then(function(text) 
      {
<<<<<<< HEAD
        DefaultRender(`${response.status} ${response.statusText} ${text}`);
=======
        RenderError(`${response.status} ${response.statusText} ${text}`);
>>>>>>> 8aadeb8ff58ad38067efb38aaca2b6528aa82d27
      })
      }
    })
    .catch((error) => {
<<<<<<< HEAD
      DefaultRender(`Error: ${error.message} `);
=======
      RenderError(`Error: ${error.message} `);
>>>>>>> 8aadeb8ff58ad38067efb38aaca2b6528aa82d27
    });
  }

  

<<<<<<< HEAD
=======
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
>>>>>>> 8aadeb8ff58ad38067efb38aaca2b6528aa82d27
}









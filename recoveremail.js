import { getCookie } from "./cookie.js";
import { defaultRender } from "./errorHandler.js";
export const render = (root) => {
  root.innerHTML = "";

  let formSendEmail = document.createElement("form")

  let EmailLabel = document.createElement("label")
  let EmailLabelText = document.createTextNode("Email: ")

  EmailLabel.appendChild(EmailLabelText)

  let Email = document.createElement("input")

  let SentOrNotDiv = document.createElement("div");
  SentOrNotDiv.setAttribute("id", "SentOrNotDiv")

  let SendButton = document.createElement("button")
  SendButton.innerHTML = "Bekräfta";

  const HomepageLink = document.createElement("a");
  HomepageLink.href = "/";
  const HompageText = document.createTextNode("Logga in här");
  HomepageLink.appendChild(HompageText);

  formSendEmail.appendChild(EmailLabel)
  formSendEmail.appendChild(Email)
  formSendEmail.appendChild(SendButton)
  formSendEmail.appendChild(SentOrNotDiv)
  formSendEmail.appendChild(HomepageLink)

  root.appendChild(formSendEmail);

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
        RecoveryMessage("Email sent.");
        return true;
      } else {
        return response.text().then(function(text) 
      {
        defaultRender(`${text.error}`);
      })
      }
    })
    .catch((error) => {
      defaultRender(`Error: ${error.message} `);
    });
  }

  function RecoveryMessage(string){
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









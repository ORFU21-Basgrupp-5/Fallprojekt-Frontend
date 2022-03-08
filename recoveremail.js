import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";
  let formPassword = document.createElement("form")

  let labelEmail= document.createElement("label")
  let emailtext=document.createTextNode("Email: ")
  let textdiv = document.createElement("div");
  textdiv.setAttribute("id", "textdiven")
  
  let email = document.createElement("input")

  labelEmail.appendChild(emailtext)

  formPassword.appendChild(labelEmail)
  formPassword.appendChild(email)

  let submitbtn = document.createElement("button")
  formPassword.appendChild(submitbtn)
  submitbtn.innerHTML = "Bekräfta";

  formPassword.appendChild(textdiv)
  root.appendChild(formPassword);

  submitbtn.onclick = function (e) {
    e.preventDefault()
    const emailrecdto = {
      Email: email.value
    };
    SendRecoveryEmail(emailrecdto);
  }

  function RecoveryText(string){
    textdiv.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode(string))
      );
      setTimeout(function () {
        textdiv.removeChild(textdiv.lastChild);
      }, 2000);
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
        RecoveryText("Email sent.");
        return true;
      } else {
        RecoveryText("Did not send email.");
        // throw new Error("NETWORK RESPONSE ERROR");
      }
    });
  }
}









import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";
  let formPassword = document.createElement("form")
  let breaker = document.createElement("br")
  let breaker2= document.createElement("br")

  let labelEmail= document.createElement("label")
  let emailtext=document.createTextNode("Email: ")
  let labelNew= document.createElement("label")
  let newtext=document.createTextNode("Nytt lösenord: ")
  let labelConfirm= document.createElement("label")
  let confirmtext=document.createTextNode("Bekräfta lösenord: ")

  let email = document.createElement("input")
  let newPassword = document.createElement("input")
  let confirmPassword = document.createElement("input")

  labelEmail.appendChild(emailtext)
  labelNew.appendChild(newtext)
  labelConfirm.appendChild(confirmtext)
  formPassword.appendChild(labelEmail)
  formPassword.appendChild(email)
  formPassword.appendChild(breaker2)
  formPassword.appendChild(labelNew)
  formPassword.appendChild(newPassword)
  formPassword.appendChild(breaker)
  formPassword.appendChild(labelConfirm)
  formPassword.appendChild(confirmPassword)

  // let submitbtn = document.createElement("submit")
  // formPassword.appendChild(submitbtn)

  let submitbtn = document.createElement("button")
  formPassword.appendChild(submitbtn)
  submitbtn.innerHTML = "Bekräfta";

  submitbtn.onclick = function (e) {
    e.preventDefault()
    if (newPassword.value===confirmPassword.value) {
      const emailrecdto = {
        Email: email.value,
        NewPassword: newPassword.value,
        ConfirmPassword: confirmPassword.value
      };
      changepassword(emailrecdto)
    }
    else{
      console.log("Lösenorden matchar inte")
    }
  
  }
  
  root.appendChild(formPassword)

  async function changepassword(emailrecdto) {
      
    const recoverPass = await fetch(
      "http://localhost:7151/User/recover",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify(emailrecdto)
      }
    ).then((response) => {
      if (response.ok) {
        return true;
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    });
  }
};





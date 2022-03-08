import { getCookie } from "./cookie.js";

export const render = (root,token) => {
    root.innerHTML = "";

    let formPassword = document.createElement("form")
    let breaker = document.createElement("br")

    let labelNew= document.createElement("label")
    let newtext=document.createTextNode("Nytt lösenord: ")
    let labelConfirm= document.createElement("label")
    let confirmtext=document.createTextNode("Bekräfta lösenord: ")

    let newPassword = document.createElement("input")
    let confirmPassword = document.createElement("input")

    labelNew.appendChild(newtext)
    labelConfirm.appendChild(confirmtext)

    formPassword.appendChild(labelNew)
    formPassword.appendChild(newPassword)
    formPassword.appendChild(breaker)
    formPassword.appendChild(labelConfirm)
    formPassword.appendChild(confirmPassword)

    let submitbtn = document.createElement("button")
    formPassword.appendChild(submitbtn)
    submitbtn.innerHTML = "Bekräfta";

    submitbtn.onclick = function (e) {
        e.preventDefault()
        if (newPassword.value===confirmPassword.value) {
        const emailrecdto = {
            NewPassword: newPassword.value,
            ConfirmPassword: confirmPassword.value
        };
        ChangePasswordLink(emailrecdto)
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
    root.appendChild(formPassword)
}
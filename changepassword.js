import { getCookie } from "./cookie.js";

export const render = (root,token) => {
    root.innerHTML = "";


    const html = `
              <form>
                <label>Nytt lösenord: </label>
                <input id="newPassword">
                <br>
                <label>Bekräfta lösenord: </label>
                <input>
                <button id="confirmButton">Bekräfta</button>
                <br>
                <a href="/">Logga in här</a>
              </form>
              `

    root.innerHTML = html;

    // let formPassword = document.createElement("form")
    // let breaker = document.createElement("br")

    // let NewPLabel= document.createElement("label")
    // let NewPLabelText=document.createTextNode("Nytt lösenord: ")

    // let ConfirmPLabel= document.createElement("label")
    // let ConfirmPLabelText=document.createTextNode("Bekräfta lösenord: ")

    // let newPassword = document.createElement("input")
    // let confirmPassword = document.createElement("input")

    let ChangeButton = document.getElementById("confirmButton")
    // ChangeButton.innerHTML = "Bekräfta";

    // const HomepageLink = document.createElement("a");
    // HomepageLink.href = "/";
    // const HomepageLinkText = document.createTextNode("Logga in här");
    // HomepageLink.appendChild(HomepageLinkText);

    // NewPLabel.appendChild(NewPLabelText)
    // ConfirmPLabel.appendChild(ConfirmPLabelText)

    // formPassword.appendChild(NewPLabel)
    // formPassword.appendChild(newPassword)
    // formPassword.appendChild(breaker)
    // formPassword.appendChild(ConfirmPLabel)
    // formPassword.appendChild(confirmPassword)
    // formPassword.appendChild(ChangeButton)
    // formPassword.appendChild(HomepageLink)

    // root.appendChild(formPassword)

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
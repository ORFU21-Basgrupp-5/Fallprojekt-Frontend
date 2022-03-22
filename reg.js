import { getCookie } from "./cookie.js";
import { Render as welcomepage } from "./welcome.js";
import { Header } from "./header.js"

export const render = (root) => {
  root.innerHTML = "";

  const regform =  `
  <div id="pageContent">
    <div id="reg">
      <h1>Skapa ett konto</h1>
    </div>
    <p>Har du redan ett konto?<a href="/">Logga in här</a> </p>
    <form id="reg_form"><div id="hidden-message">
      
      <div id="uname">
        <label for="username">Användarnamn</label>
        <input type="text" name="username" placeholder="Välj ett användarnamn">
      </div>
      <div id="email">
        <label for="email">Email:</label>
        <input type="text" name="email" placeholder="Fyll i din epost">
      </div>
      <div id="pswrd">
        <label for="password">Lösenord: </label>
        <input type="text" name="password" placeholder="Välj ett lösenord">
      </div>
      <div id="pswrdvalid">
        <label for="password2">Bekräfta lösenord:</label>
        <input type="text" name="password2" placeholder="Bekräfta lösenord">
        </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      <div id="errorDiv"></div>
    </form>
  </div>
  `

  root.innerHTML = regform
  const form = document.getElementById("reg_form");

  form.onsubmit = (e) => {
    e.preventDefault();
    const userRegister = [
      document.forms["reg_form"]["username"].value,
      document.forms["reg_form"]["email"].value,
      document.forms["reg_form"]["password"].value,
      document.forms["reg_form"]["password2"].value,
    ];

    const usernamevalidate = userRegister.every((x) => x != "");
    if (usernamevalidate) {
      if (userRegister[2] != userRegister[3]) {
        let errorPassContainer = document.getElementById("hidden-message");
        let newText = document
          .createElement("p")
          .appendChild(document.createTextNode("Lösenorden matchar inte!"));
        errorPassContainer.appendChild(newText);
      } else if (CheckPassword(userRegister[2]) === false) {
        let errorPassContainer = document.getElementById("hidden-message");
        let newText = document
          .createElement("p")
          .appendChild(
            document.createTextNode(
              "Ditt lösenord måste ha minst 12 tecken,en gemen, en storbokstav, en siffra och ett special tecken"
            )
          );
        errorPassContainer.appendChild(newText);
      } else {
        const name = userRegister[0];
        const email = userRegister[1];
        const password = userRegister[2];

        const userDTO = {
          userName: name,
          password: password,
          email: email,
        };

        FetchReg(userDTO);
      }
    } else {
      let errorPassContainer = document.getElementById("hidden-message");
      let newText = document
        .createElement("p")
        .appendChild(document.createTextNode("Du måste fylla i alla fälten!"));
      errorPassContainer.appendChild(newText);
    }
  };

  async function FetchReg(newUser) {
    let response = await fetch("http://localhost:7151/User/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(newUser),
    });
    let textreponse = await response.text();
    if (!response.ok) {
        renderError(`Error is: ${response.status} ${textreponse}`);
    } else {
      var activeUser = newUser.userName;
      sessionStorage.setItem("User", activeUser);
      alert("Du är nu registrerad!");
      welcomepage(pageContent);
      let header = new Header();;
    }
  }

  function CheckPassword(password) {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,50}$/;
    if (password.match(paswd)) {
      return true;
    } else {
      return false;
    }
  }
};


const renderError = function(msg){
  const regError = document.getElementById('reg_form')
  regError.insertAdjacentText('beforeend', msg)
}
//Orginalsträng till html
// const stringReg = '<div id="reg"><h1>Skapa ett konto</h1><p>Har du redan ett konto? <a href="/">Logga in här</a></p><form id="reg_form"><div id="hidden-message"></div><div id="uname"><label for="username">Användarnamn </label><input type="text" name="username" placeholder="Välj ett användarnamn"></div><div id="email"><label for="email">Email: </label><input type="text" name="email" placeholder="Fyll i din epost"></div><div id="pswrd"><label for="password">Lösenord: </label><input type="text" name="password" placeholder="Välj ett lösenord"></div><div id="pswrdvalid"><label for="password2">Bekräfta lösenord: </label><input type="text" name="password2" placeholder="Bekräfta lösenord"></div><div id="btn"><input type="submit"></div></form></div>'

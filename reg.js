import { GetCookie } from "./cookie.js";
import { Render as Welcomepage } from "./welcome.js";
import { Header } from "./header.js"
import { DefaultRender } from "./errorHandler.js";

export const Render = (root) => {
  root.innerHTML = "";

  const regform =  `
    <div id="reg">
      <h1>Skapa ett konto</h1>
    </div>
    <p>Already registered?<a href="/">Log in here</a> </p>
    <form id="reg_form"><div id="hidden-message">

      <div id="uname" class="input">
        <label for="username">Username:</label><br>
        <input type="text" name="username" placeholder="Choose a username">
      </div>
      <div id="email" class="input">
        <label for="email">Email:</label><br>
        <input type="text" name="email" placeholder="Fill in your email">
      </div>
      <div id="pswrd" class="input">
        <label for="password">Password: </label><br>
        <input type="text" name="password" placeholder="Choose a password">
      </div>
      <div id="pswrdvalid" class="input">
        <label for="password2">Confirm password:</label><br>
        <input type="text" name="password2" placeholder="Confirm password">
        </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  `

  root.innerHTML = regform;
  document.title ="Registrering";
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
       DefaultRender("Passwords do not match!");
        
      } else if (CheckPassword(userRegister[2]) === false) {
        DefaultRender(
          "Your password must be at least 12 characters long, one small letter, one big letter, one number and one special character."    
          
            );
        
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
      DefaultRender("All fields must be filled.");
    }
  };


  async function FetchReg(newUser) {
    let response = await fetch("http://localhost:7151/User/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie("token"),
      },
      body: JSON.stringify(newUser),
    });
    
    if (!response.ok) {
        DefaultRender(`${text.error}`);
    } else {
      var activeUser = newUser.userName;
      sessionStorage.setItem("User", activeUser);
      alert("Registration completed successfully!");
      Welcomepage(pageContent);
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

//Orginalsträng till html
// const stringReg = '<div id="reg"><h1>Skapa ett konto</h1><p>Har du redan ett konto? <a href="/">Logga in här</a></p><form id="reg_form"><div id="hidden-message"></div><div id="uname"><label for="username">Användarnamn </label><input type="text" name="username" placeholder="Välj ett användarnamn"></div><div id="email"><label for="email">Email: </label><input type="text" name="email" placeholder="Fyll i din epost"></div><div id="pswrd"><label for="password">Lösenord: </label><input type="text" name="password" placeholder="Välj ett lösenord"></div><div id="pswrdvalid"><label for="password2">Bekräfta lösenord: </label><input type="text" name="password2" placeholder="Bekräfta lösenord"></div><div id="btn"><input type="submit"></div></form></div>'

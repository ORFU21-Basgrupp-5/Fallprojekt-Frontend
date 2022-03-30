import API_Service from "/services/API_Service.js";
import { defaultRender } from "/services/errorHandler.js";
import { getCookie } from "/services/cookie.js";

let RegisterUser = {
    render: async () => {
        let view =  `
        <div class="container">
          <div class="register-container">
            <div id="reg">
              <h1>Skapa ett konto</h1>
            </div>
            <p>Har du redan ett konto?<a href="./#/login">Logga in här</a> </p>
            <form id="reg_form" class="inputForm"><div id="hidden-message">
              
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
                <button class="submit_button" type="submit">Submit</button>
              </div>
              <div id="errorDiv" class="errorMessage"></div>
            </form>
          </div>
        </div>
        `

        return view;
    },
    after_render: async () => {
      const form = document.getElementById("reg_form");
      const pageContent = document.getElementById("pageContent");
    
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
            defaultRender("Lösenorden matchar inte")
          } else if (CheckPassword(userRegister[2]) === false) {
            defaultRender("Ditt lösenord måste ha minst 12 tecken,en gemen, en storbokstav, en siffra och ett special tecken")
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
          defaultRender("Du måste fylla i samtliga fält")
        }
      };
    
      async function FetchReg(newUser) {
        let response = await fetch("http://localhost:7151/api/User/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
          body: JSON.stringify(newUser),
        });
        let textresponse = await response.text();
        if (!response.ok) {
          defaultRender(`${textresponse}`)
        } else {
          var activeUser = newUser.userName;
          sessionStorage.setItem("User", activeUser);
          alert("Du är nu registrerad!");
          window.location.hash = "#/";
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
    },
};

export default RegisterUser;
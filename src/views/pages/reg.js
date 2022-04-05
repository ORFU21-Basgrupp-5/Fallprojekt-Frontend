import API_Service from "/services/API_Service.js";
import { defaultRender } from "/services/errorHandler.js";
import { getCookie } from "/services/cookie.js";
import { setCookie } from "/services/cookie.js";


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
                <input type="password" name="password" placeholder="Välj ett lösenord">
              </div>
              <div id="pswrdvalid">
                <label for="password2">Bekräfta lösenord:</label>
                <input type="password" name="password2" placeholder="Bekräfta lösenord">
                </div>
                <div id="btn">
              <input type="submit" />
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
              const fetchresult = await API_Service.PostService(
              "User/register",
              newUser
          );
          console.log(fetchresult);
          if (fetchresult != false) {
              CreateLoginToken(fetchresult);
              form.reset();
              defaultRender("Du är nu registrerad!");
              setTimeout(logedIn, 2000);
              function logedIn() {
                window.location.hash = "#/";
              }
          } else {
              defaultRender(fetchresult);
          }
      }
      //creates 1 token for our JWT encoding and one for just the user name so that we can use username as well.
      function CreateLoginToken(data) {
          setCookie("token",data.token)
          setCookie("user",data.user)
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

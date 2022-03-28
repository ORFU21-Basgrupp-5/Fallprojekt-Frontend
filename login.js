import { Render as welcomepage } from "./welcome.js";
import { render as RegRender } from "./reg.js";
import { Header } from "./header.js";
import { render } from "./recoveremail.js";
import { render as recoverpassword } from "./changepassword.js";
import {defaultRender} from "./errorHandler.js";

let currenturl = new URL(document.URL);
let urlparams = new URLSearchParams(currenturl.search);

if (urlparams.get("token") != null) {
  recoverpassword(pageContent, urlparams.get("token"));
  console.log("token param found");
} else {
  let pageContent = document.getElementById("pageContent");

  const linkToRecover = document.getElementById("recover-btn");
  linkToRecover.onclick = function (e) {
    e.preventDefault();
    render(pageContent);
  };

  let reglink = document.getElementById("reglink");
  //console.log("Password to TestKonto1: Admin2Lösen**")
  reglink.onclick = function (e) {
    e.preventDefault();
    RegRender(pageContent);
  };

  let form = document.getElementById("login-form");

  form.onsubmit = (e) => {
    e.preventDefault();
    const userlogin = [
      document.forms["login-form"]["username"].value,
      document.forms["login-form"]["password"].value,
    ];

    const userLoginDTO = {
      userName: document.forms["login-form"]["username"].value,
      //password: "Admin2Lösen**"
      password: document.forms["login-form"]["password"].value,
    };
    const upvalidate = userlogin.every((login) => login != "");
    if (upvalidate) {
      let isLoggedIn = false;
      async function fetchLogin() {
        const response = await fetch("http://localhost:7151/User/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLoginDTO),
        })
          .then((response) => {
            if (response.ok) {
              isLoggedIn = true;
              return response.json();
            } else {
              return response.text().then(function (text) {
                console.log(text)
                defaultRender(
                  `${text}`
                );
              });
            }
          })
          .then((data) => {
            //console.log(data);
            let token = data.token;
            let user = data.user;
            let expires = new Date(Date.now() + 86400 * 1000).toUTCString();

            const cookie = (document.cookie =
              "token=" +
              token +
              ";" +
              "user=" +
              user +
              ";" +
              "expires=" +
              expires +
              86400 +
              ";path=/;");

            let activeUser = userLoginDTO.userName;
            sessionStorage.setItem("User", activeUser);

            welcomepage(pageContent);
            let header = new Header();
          })
          return response.json().then ((body)=>{
            const BodyError = new Error(body.error)
          })
          .catch((error) => {
            console.log(`Error: ${error.message} `);
          })
          .catch((BodyError) => {
            console.log(`Error: ${BodyError} `);
          });
      }

      fetchLogin().catch((error) => {
        console.log(error.message);
      });

      // 'An error has occurred: 404'
    } else {
      defaultRender("Fyll i samtliga fält");
    }
  };

  //'Authorization': 'Bearer ' + cookies.get('token')

}

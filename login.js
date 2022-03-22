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
  console.log("Password to TestKonto1: Admin2Lösen**")
  reglink.onclick = function (e) {
    e.preventDefault();
    RegRender(pageContent);
  };

  let form = document.getElementById("form1");

  form.onsubmit = (e) => {
    e.preventDefault();
    const userlogin = [
      document.forms["form1"]["username"].value,
      document.forms["form1"]["password"].value,
    ];

    const userLoginDTO = {
      userName: document.forms["form1"]["username"].value,
      password: "Admin2Lösen**"
      // password: document.forms["form1"]["password"].value,
    };
    const upvalidate = userlogin.every((login) => login.value != "");
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
                defaultRender(
                  `${text.error}`
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
          .catch((error) => {
            defaultRender(`Error: ${error.message} `);
          })
          .catch((BodyError) => {
            defaultRender(`Error: ${BodyError} `);
          });
      }

      fetchLogin().catch((error) => {
        error.message;
      });

      // 'An error has occurred: 404'
    } else {
      defaultRender("Enter stuff");
    }
  };

  //'Authorization': 'Bearer ' + cookies.get('token')

}

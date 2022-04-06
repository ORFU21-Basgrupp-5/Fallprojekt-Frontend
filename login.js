import { Render as Welcomepage } from "./welcome.js";
import { Render as RegRender } from "./reg.js";
import { Header } from "./header.js";
import { Render } from "./recoveremail.js";
import { Render as recoverpassword } from "./changepassword.js";
import {DefaultRender} from "./errorHandler.js";
import API_Service from "./API_Service.js";

let currenturl = new URL(document.URL);
let urlparams = new URLSearchParams(currenturl.search);

if (urlparams.get("token") != null) {
  Recoverpassword(pageContent, urlparams.get("token"));
  console.log("token param found");
} else {
  let pageContent = document.getElementById("pageContent");

  const linkToRecover = document.getElementById("recover-btn");
  linkToRecover.onclick = function (e) {
    e.preventDefault();
    Render(pageContent);
  };

  let reglink = document.getElementById("reglink");
  //console.log("Password to TestKonto1: Admin2Lösen**")
  reglink.onclick = function (e) {
    e.preventDefault();
    RegRender(pageContent);
  };

  let form = document.getElementById("login-form");
  let loginButton = document.getElementById("btn")

  loginButton.onclick = (e) => {
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
      fetchLogin(userLoginDTO);
    }
      // 'An error has occurred: 404'
    else {
      DefaultRender("Fyll i samtliga fält");
    }
  };

  async function fetchLogin(userBody) {
    const fetchresult =  await API_Service.PostService("User/login", userBody);
    console.log(fetchresult);
    if(fetchresult != false){
      CreateLoginToken(fetchresult);
    }else {
      DefaultRender("Användarnamn eller lösenord är fel.")
    }
  }

  function CreateLoginToken(data){
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

    // let activeUser = userLoginDTO.userName;
    // sessionStorage.setItem("User", activeUser);

    Welcomepage(pageContent);
    let header = new Header();
}
  //'Authorization': 'Bearer ' + cookies.get('token')

}

import {Render as welcomepage} from './welcome.js'
import { render as RegRender} from "./reg.js";
import { Header } from "./header.js";

let pageContent = document.getElementById("pageContent");

let reglink = document.getElementById("reglink");
reglink.onclick = function(e) {
  e.preventDefault();
  RegRender(pageContent);
}

let form = document.getElementById("form1");

form.onsubmit= (e) =>{
  e.preventDefault();
  const userlogin = [document.forms["form1"]["username"], document.forms["form1"]["password"]];
  const upvalidate =  userlogin.every(login => login.value != "");

  if(upvalidate){
      async function fetchLogin() {
          const response = await fetch('https://localhost:7151/User/Login?'+'userName='+ userlogin[0].value + '&passWord=' + userlogin[1].value);
          if (!response.ok) {
            alert('Fel lösenord eller användarenamn!')
          }
          else
          {
            var activeUser = userlogin[0].value;
            sessionStorage.setItem("User", activeUser);
              alert('du är inloggad');
              welcomepage(pageContent)
              const header = new Header();
          }

        }
        fetchLogin().catch(error => {
          error.message; // 'An error has occurred: 404'
        });
  } else {
      alert("Enter stuff");
  }
}



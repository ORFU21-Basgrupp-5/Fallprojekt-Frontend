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
  var logginbool = false;
  const userLoginDTO = 
  {
  userName: document.forms["form1"]["username"].value,
  password: document.forms["form1"]["password"].value
  }
  const upvalidate =  userlogin.every(login => login.value != "");
  if(upvalidate){
    async function fetchLogin() 
    {
        const response = await fetch('http://localhost:7151/User/login',
        {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userLoginDTO)
      })
        .then ((response) =>
        {
          if (response.ok)
          { 
            logginbool = true;
            return response.json();
          }
          else
          {
            throw new Error('Error')
          }
        })
        .then (data => {
          console.log(data);
          token = data.token;
          user = data.user;
          let expires = (new Date(Date.now()+86400*1000)).toUTCString();

          const cookie = document.cookie = 'token=' + token+';'+'user='+ user+';'+'expires='+ expires + 86400+';path=/;';
          console.log(cookie)

          return "";
        })
      }
      welcomepage(pageContent)
      let header = new Header();
      fetchLogin().catch(error => {error.message}); // 'An error has occurred: 404'
  } else {
      alert("Enter stuff");
  }
}


//'Authorization': 'Bearer ' + cookies.get('token')
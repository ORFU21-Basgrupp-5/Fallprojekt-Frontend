import { Render as welcomepage } from "./welcome.js";
import { render as RegRender } from "./reg.js";
import { Header } from "./header.js";

let pageContent = document.getElementById("pageContent");

let reglink = document.getElementById("reglink");
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
    password: document.forms["form1"]["password"].value,
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
          }
          else {

            return response.text().then(function(text) 
            {
              renderError(`${response.status} ${response.statusText} ${text}`);
            })
          }
          
          
        })
        .then((data) => {
          
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
        });
        return response.json().then ((body)=>{
          const BodyError = new Error(body.error)
        })
        .catch((error) => {
      
          renderError(`Error: ${error.message} `)
        })
    }

    fetchLogin().catch((error) => {
      
      renderError(`Error: ${error.message} `)
    })
    .catch((BodyError) => {
      renderError(`Error: ${BodyError} `)
       
    });

    const renderError = function(msg){
      const loginDiv = document.getElementById('login')
      loginDiv.insertAdjacentText('beforeend', msg)
  }

    // 'An error has occurred: 404'
  } else {
    alert("Enter stuff");
  }
};

//'Authorization': 'Bearer ' + cookies.get('token')

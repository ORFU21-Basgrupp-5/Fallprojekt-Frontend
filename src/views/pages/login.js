import API_Service from "/src/services/API_Service.js";
import { defaultRender } from "/src/services/errorHandler.js";
import { setCookie } from "/src/services/cookie.js";

let login = {
    render: async () => {
        let view = `
        <div id="login">
        <h1>Login</h1>
        <p>Saknar du ett konto? <a href="./#/registeruser" id="reglink">Skapa konto</a></p>
      
        <form id="form1">
          <div id="uname">
            <label for="username">Användarnamn: </label>
            <input
              type="text"
              name="username"
              placeholder="Fyll i ditt användarnamn"
            />
          </div>
      
          <div id="pswrd">
            <label for="password">Lösenord: </label>
            <input
              type="password"
              name="password"
              placeholder="Fyll i ditt lösenord"
            />
          </div>
          <div id="recover">
            <a href="" id="recover-btn">Glömt lösenordet?</a>
          </div>
      
          <div id="btn">
            <input type="submit" />
          </div>
          <div id="errorDiv" class="errorMessage"></div>
        </form>
      </div>`;

        return view;
    },
    after_render: async () => {
        let pageContent = document.getElementById("pageContent");

        const linkToRecover = document.getElementById("recover-btn");
        linkToRecover.onclick = function (e) {
            e.preventDefault();
            window.location.hash = "#/recoverymail";
        };

        let reglink = document.getElementById("reglink");
        //console.log("Password to TestKonto1: Admin2Lösen**")
        reglink.onclick = function (e) {
            e.preventDefault();
            window.location.hash = "#/registeruser";
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
                //password: "Admin2Lösen**"
                password: document.forms["form1"]["password"].value,
            };
            const upvalidate = userlogin.every((login) => login != "");
            if (upvalidate) {
                fetchLogin(userLoginDTO);
            }
            // 'An error has occurred: 404'
            else {
                defaultRender("Fyll i samtliga fält");
            }
        };

        async function fetchLogin(userBody) {
            const fetchresult = await API_Service.PostService(
                "User/login",
                userBody
            );
            console.log(fetchresult);
            if (fetchresult != false) {
                CreateLoginToken(fetchresult);
                window.location.hash = "#/";
            } else {
                defaultRender("Användarnamn eller lösenord är fel.");
            }
        }

        function CreateLoginToken(data) {
            setCookie("token",data.token)
            setCookie("user",data.user)
            
        }
    },
};

export default login;

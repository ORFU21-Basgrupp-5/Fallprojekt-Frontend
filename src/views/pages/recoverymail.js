import API_Service from "/services/API_Service.js";
import { defaultRender } from "/services/errorHandler.js";
import { setCookie } from "/services/cookie.js";

let RecoveryMail = {
    render: async () => {
        let view =  ` 
        <div class="container">
          <form class="inputForm">
            <label>Email: </label>
            <input id= "Email" >
            <button class="submit_button" id="recoverbutton">Bekräfta</button>
            <div id="SentOrNotDiv"></div>
            <a href="/">Logga in här</a>
            <div id="errorDiv" class="errorMessage"></div>
          </form>
        </div>`;

        return view;
    },
    after_render: async () => {
      let SendButton = document.getElementById("recoverbutton")
      let Email = document.getElementById("Email")
      
      
        SendButton.onclick = function (e) {
          e.preventDefault()
          const EmailDTO = {
            Email: Email.value
          };
          SendRecoveryEmail(EmailDTO);
        }
      
        async function SendRecoveryEmail(emailrecdto) {
          
          const recoverPass = await fetch(
            "http://localhost:7151/User/SendRecoveryEmail",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(emailrecdto)
            }
          ).then((response) => {
            if (response.ok) {
              RecoveryMessage();
              return true;
            } else {
              return response.text().then(function (text) {
                console.log(text)
                defaultRender(
                  `${text}`
                );
              });
            }
          })
          .catch((error) => {
            defaultRender(`Error: ${error.message} `);
          });
        }
      
        function RecoveryMessage(string){
         defaultRender("Email sent.")
        }
    },
};

export default RecoveryMail;

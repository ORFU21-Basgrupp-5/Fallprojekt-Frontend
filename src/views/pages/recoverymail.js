import API_Service from "/src/services/API_Service.js";
import { defaultRender } from "/src/services/errorHandler.js";
import { setCookie } from "/src/services/cookie.js";

let RecoveryMail = {
    render: async () => {
        let view =  ` 
        <form>
          <label>Email: </label>
          <input id= "Email" >
          <button id= "recoverbutton">Bekräfta</button>
          <div id="SentOrNotDiv"></div>
          <a href="/">Logga in här</a>
          <div id="errorDiv" class="errorMessage"></div>
        </form>`;

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

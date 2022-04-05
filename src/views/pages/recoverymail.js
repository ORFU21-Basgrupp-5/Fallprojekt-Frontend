import API_Service from '/services/API_Service.js';
import { defaultRender } from '/services/errorHandler.js';
import { setCookie } from '/services/cookie.js';

let RecoveryMail = {
	render: async () => {
		let view = ` 
        <div class="container">
          <form class="inputForm">
            <label>Email: </label>
            <input id= "Email" >
            <button class="submit_button" id="recoverbutton">Bekräfta</button>
            <div id="SentOrNotDiv"></div>
            <a href="/#/login">Logga in här</a>
            <div id="errorDiv" class="errorMessage"></div>
          </form>
        </div>`;

		return view;
	},
	after_render: async () => {
		let SendButton = document.getElementById('recoverbutton');
		let Email = document.getElementById('Email');

		SendButton.onclick = function (e) {
			e.preventDefault();
			const EmailDTO = {
				Email: Email.value,
			};
			SendRecoveryEmail(EmailDTO);
		};

		async function SendRecoveryEmail(emailrecdto) {
			const fetchresult = await API_Service.PostService(
				'User/SendRecoveryEmail',
				emailrecdto
			);
			console.log(fetchresult);
			if (fetchresult != false) {
				defaultRender('Email sent.');
			} else {
				defaultRender(fetchresult);
			}
		}
	},
};

export default RecoveryMail;

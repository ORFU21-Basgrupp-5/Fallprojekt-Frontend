import API_Service from "/services/API_Service.js";
import { defaultRender } from "/services/errorHandler.js";
import { setCookie } from "/services/cookie.js";

let logout = {
    render: async () => {
        let view = `
        <div class="container">
          <div id="goodbye">
          <h1>Du är nu utloggad, ha en bra dag.</h1>
        </div>
      </div>`;

        return view;
    },
    after_render: async () => {
        
    },
};

export default logout;

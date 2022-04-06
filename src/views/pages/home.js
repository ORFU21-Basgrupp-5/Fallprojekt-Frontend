import { getCookie } from "/services/cookie.js";

let Home = {
  render : async () => {
    let currentUser = getCookie('user');
    
    console.log(currentUser);
    if(currentUser === null) {
      currentUser = '';
    }
    let view = `
    <div class="container">
      <h1>Welcome</h1>
      <div id="active_user">${currentUser}</div>
      
      <div id="errorDiv" class="errorMessage"></div>
      </div>
    </div>`;
    return view;
  }, after_render: async () => {
   
  }

}
export default Home;
export const Render = (root) => {
  root.innerHTML = "";

var ActiveUser = sessionStorage.getItem("User");

const headertag = document.getElementById('header')
const header = `
    <div id="header">
      <button id="button-inmatning">Add balance change</button>
      <button id="button-listaexpenses">List expenses</button>
      <button id="button-listaincomes">List incomes</button>
      <button id="button-createbudget">Create budget</button>
      <button id="button-listabudget">Display budget</button>
    </div>`

{/* <button id="emailknapp">Email</button>  */} 

headertag.innerHTML = header;
  
const html = `
    
    <div id="pageContent">
    <div class="header-div">
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>
      <div id="errorDiv"></div>
      </div>
    </div>`

root.innerHTML = html

};


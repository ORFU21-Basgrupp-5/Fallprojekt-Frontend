export const Render = (root) => {
  root.innerHTML = "";

var ActiveUser = sessionStorage.getItem("User");

const headertag = document.getElementById('header')
const header = `
    <div id="header">
      <button id="button-inmatning">Inmatning</button>
      <button id="button-listaexpenses">ListaExpenses</button>
      <button id="button-listaincomes">ListaIncomes</button>
      <button id="button-createbudget">Skapa Budget</button>
      <button id="button-listabudget">Visa Budget</button>
      <button id="LogOut">Logga ut </button>
    </div>`

{/* <button id="emailknapp">Email</button>  */} 

headertag.innerHTML = header;
  
const html = `
    
    <div id="pageContent">
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>
      <div id="errorDiv"></div>
    </div>`

root.innerHTML = html

};


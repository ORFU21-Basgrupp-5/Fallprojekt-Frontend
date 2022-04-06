export const Render = (root) => {
  root.innerHTML = "";

var ActiveUser = sessionStorage.getItem("User");

const headertag = document.getElementById('navmenu')
const header = `
<input type="checkbox" id="menuclick" value="Menu">
<div id="testmenu" class="menu">
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
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>`

root.innerHTML = html

};


export const Render = (root) => {
  root.innerHTML = "";

var ActiveUser = sessionStorage.getItem("User");

const headertag = document.getElementById('header')
const header = `
    <div id="header">
      <button id="buttonInmatning">Inmatning</button>
      <button id="buttonELista">ListaExpenses</button>
      <button id="buttonILista">ListaIncomes</button>
      <button id="emailknapp">Email</button>  
      </div>`

headertag.innerHTML = header;
  
const html = `
    <div id="pageContent">
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>
    </div>`

root.innerHTML = html
};
export const Render = (root) => {
  root.innerHTML = "";

var ActiveUser = sessionStorage.getItem("User");

const headertag = document.getElementById('header')
const header = `
    <div id="header">
      <button id="buttonInmatning">Inmatning</button>
      <button id="buttonELista">ListaExpenses</button>
      <button id="buttonILista">ListaIncomes</button>
      <button id="budgetPage">Skapa Budget</button>
      <button id="budgetGetPage">Visa Budget</button>
    </div>`

{/* <button id="emailknapp">Email</button>  */} 

headertag.innerHTML = header;
  
const html = `
    
    <div id="pageContent">
      <div  class="spacer1"> . </div>
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>
      <div id="errorDiv"></div>
    </div>
    <div  class="spacer2"> . </div>`

root.innerHTML = html

};


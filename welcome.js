export const Render = (root) => {
  root.innerHTML = "";

var ActiveUser = sessionStorage.getItem("User");

const headertag = document.getElementById('header')
const header = `
    
      <button class="button-1" role="button" id="buttonInmatning">Inmatning</button>
      <button class="button-1" role="button" id="buttonELista">ListaExpenses</button>
      <button class="button-1" role="button" id="buttonILista">ListaIncomes</button>
      <button class="button-1" role="button" id="budgetPage">Skapa Budget</button>
      <button class="button-1" role="button" id="budgetGetPage">Visa Budget</button>
    `

{/* <button id="emailknapp">Email</button>  */} 

headertag.innerHTML = header;
  
const html = `
    
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>
      <div id="errorDiv"></div>
    `

root.innerHTML = html

};


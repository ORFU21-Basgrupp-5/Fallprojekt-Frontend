export const Render = (root) => {
  root.innerHTML = "";

var ActiveUser = sessionStorage.getItem("User");

const headertag = document.getElementById('navmenu')
const header = `
<input type="checkbox" id="menuclick" value="Menu">
<div id="testmenu" class="menu">
      <button id="button-inputs">Add balance change</button>
      <button id="button-listexpenses">List expenses</button>
      <button id="button-listincomes">List incomes</button>
      <button id="button-createbudget">Create budget</button>
      <button id="button-listbudget">Display budget</button>
      <button id="LogOut">Log out </button>
    </div>`

{/* <button id="emailknapp">Email</button>  */} 

headertag.innerHTML = header;
  
const html = `
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>`

root.innerHTML = html

};


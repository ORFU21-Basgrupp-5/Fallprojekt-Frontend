import { getCookie } from "./services/cookie.js";
import {defaultRender} from "./services/errorHandler.js";
import API_Service from "./services/API_Service.js";
export const render = (root) => {
  root.innerHTML = "";
  const html = `
    <h1>Lista Inkomster</h1>
      <div id="DivWithIncomes">
      <div id="errorDiv"></div>
    </div>
    <div  class="spacer5"> . </div>`;
  root.innerHTML = html;
  
  fetchresult();
};

async function fetchresult() {
  const data = await API_Service.GetService("Income");
  if(data != null){
    upgiftsLista(data);
  }
}

function upgiftsLista(data) {
  data.forEach((item) => {
    let diven = document.getElementById("DivWithIncomes");
    let listContainer = document.createElement("ul");
    diven.appendChild(listContainer);
    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      listContainer.appendChild(li);
    }
  });
}
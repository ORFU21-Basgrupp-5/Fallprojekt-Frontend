import { getCookie } from "./cookie.js";
import {defaultRender} from "./errorHandler.js";
import API_Service from "./API_Service.js";
export const render = (root) => {
  root.innerHTML = "";
  const html = `
    <h1>Lista Inkomster</h1>
      <div id="div-incomes">
    </div>`;
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
    let diven = document.getElementById("div-incomes");
    let listContainer = document.createElement("ul");
    diven.appendChild(listContainer);
    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      listContainer.appendChild(li);
    }
  });
}
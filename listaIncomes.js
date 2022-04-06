import { GetCookie } from "./cookie.js";
import {DefaultRender} from "./errorHandler.js";
import API_Service from "./API_Service.js";
export const Render = (root) => {
  root.innerHTML = "";
  const html = `
    <h1>List incomes</h1>
      <div id="div-incomes">
      <div id="errorDiv"></div>
    </div>`;
  root.innerHTML = html;
  
  fetchresult();
};

async function fetchresult() {
  const data = await API_Service.GetService("Income");
  if(data != null){
    IncomeList(data);
  }
}

function IncomeList(data) {
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
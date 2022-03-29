import { getCookie } from "./services/cookie.js";
import {defaultRender} from "/src/services/errorHandler.js";
import API_Service from "./services/API_Service.js";
export const render = (root) => {
  root.innerHTML = "";
  
  var stringLista = `
  <h1>Lista Utgifter</h1>
    <div id="DivWithExpenses">
      <div id="errorDiv"></div>
    </div>
    <div  class="spacer4"> . </div>`;
  root.innerHTML = stringLista;
  fetchresult();
};
async function fetchresult() {
  const data = await API_Service.GetService("Expense");
  if(data != null){
    upgiftsLista(data);
  }
}

function upgiftsLista(data) {
  data.forEach((item) => {
    let diven = document.getElementById("DivWithExpenses");
    let listContainer = document.createElement("ul");
    diven.appendChild(listContainer);
    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      listContainer.appendChild(li);
    }
  });
}
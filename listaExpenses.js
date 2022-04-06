import { GetCookie } from "./cookie.js";
import { DefaultRender } from "./errorHandler.js";
import API_Service from "./API_Service.js";
export const Render = (root) => {
  root.innerHTML = "";
  
  var stringLista = `
  <h1>List expenses</h1>
    <div id="div-expenses">>`;
  root.innerHTML = stringLista;
  fetchresult();
};

async function fetchresult() {
  const data = await API_Service.GetService("Expense");
  if(data != null){
    ExpenseList(data);
  }
}

function ExpenseList(data) {
  data.forEach((item) => {
    let diven = document.getElementById("div-expenses");
    let listContainer = document.createElement("ul");
    diven.appendChild(listContainer);
    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      listContainer.appendChild(li);
    }
  });
}

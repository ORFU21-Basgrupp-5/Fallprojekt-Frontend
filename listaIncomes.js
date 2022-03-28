import { getCookie } from "./cookie.js";
import {defaultRender} from "./errorHandler.js";
export const render = (root) => {
  root.innerHTML = "";
  const html = `
    <h1>Lista Inkomster</h1>
      <div id="div-incomes">
      <div id="errorDiv"></div>
    </div>`;
  root.innerHTML = html;

  GetData();
};


function GetData() {
  fetch("http://localhost:7151/ListIncome", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then(function(text) 
    {
      defaultRender(`${text}`);
    })
    }
  })
  .then((data) => {
    console.log(data);
    upgiftsLista(data);
  })
  .catch((error) => {
    defaultRender(`Error: ${error.message} `)
  })
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

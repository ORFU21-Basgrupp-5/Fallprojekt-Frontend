import { getCookie } from "./cookie.js";
import { DefaultRender } from "./errorHandler.js";
export const render = (root) => {
  root.innerHTML = "";
  
  var stringLista = `
  <h1 class="header-div">List expenses</h1>
    <div id="div-expenses">
      <div id="errorDiv"></div>
    </div>`;
  root.innerHTML = stringLista;

  GetData();
};


function GetData() {
  fetch("http://localhost:7151/ListExpenses", {
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
      DefaultRender(`${text}`);
    })
    }
  })
  .then((data) => {
    console.log(data);
    ExpenseList(data);
  })
  .catch((error) => {
    DefaultRender(`Error: ${error.message} `)
  })
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



import { getCookie } from "./cookie.js";
import { defaultRender } from "./errorHandler.js";
export const render = (root) => {
  root.innerHTML = "";
  var stringLista = '<h1>Lista Utgifter</h1><div id="DivWithExpenses"></div>';
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
      defaultRender(`${response.status} ${response.statusText} ${text}`);
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



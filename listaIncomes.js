import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";
  const html = `
    <h1>Lista Inkomster</h1>
      <div id="DivWithIncomes">
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
      renderError(`${response.status} ${response.statusText} ${text}`);
    })
    }
  })
  .then((data) => {
    console.log(data);
    upgiftsLista(data);
  })
  .catch((error) => {
    renderError(`Error: ${error.message} `)
  })
}

const renderError = function(msg){
  const ErrorDiv = document.getElementById('DivWithIncomes')
  ErrorDiv.insertAdjacentText('beforeend', msg)
  setTimeout(function () {
    ErrorDiv.removeChild(ErrorDiv.lastChild);
  }, 2000)
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

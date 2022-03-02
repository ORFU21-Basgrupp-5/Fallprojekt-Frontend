import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";
  var stringLista = '<h1>Lista Inkomster</h1><div id="DivWithIncomes"></div>';
  root.innerHTML = stringLista;

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
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      upgiftsLista(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function upgiftsLista(data) {
  data.forEach((item) => {
    let diven = document.getElementById("DivWithIncomes");
    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      diven.appendChild(li);
    }
  });
}

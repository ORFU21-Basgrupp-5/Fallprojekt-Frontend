import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";

  var stringbudget = `
  <h1>Lista Aktuell Budget</h1>
  <div id="DivWithBudget"></div>`;

  root.innerHTML = stringbudget;

 

  function budgetLista(data) {
    data.forEach((item) => {
      let diven = document.getElementById("DivWithBudget");
      let listContainer = document.createElement("ul");
      diven.appendChild(listContainer);
      for (let row in item) {
        let li = document.createElement("li");
        li.innerText = `${row}: ${item[row]}`;
        listContainer.appendChild(li);
      }
    });
  }
  function generate_table(budgetData) {

    let diven = document.getElementById("DivWithBudget");
    let titleTag = document.createElement("H2");
    let titleText = document.createTextNode(budgetData.budgetName);
    
    titleTag.appendChild(titleText);
    diven.appendChild(titleTag);

    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    for(var i = 0; i < 3; i++)
    {
     
      var row = document.createElement("tr");
      for(var j = 0; j < 7; j++)
      {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(budgetData.budgetCategories[j])
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    diven.appendChild(tbl);
    tbl.setAttribute("border","2");
  }


  const getBudget = async () => {
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    };
    try {
      const response = await fetch(
        "http://localhost:7151/api/Budget/RetrieveBudget",
        settings
      );
      if (response.ok) {
        console.log("A ok!");
        const result = await response.json();
        console.log(result);
        console.log(result.totalSum);
        generate_table(result);
    console.log(result.budgetName);
        return result;
      } else {
        const message = "Error with Status Code: " + response.status;
        throw new Error(message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  var budgetData = getBudget();


};

//get budget information
//filter den pågående budgeten att visa

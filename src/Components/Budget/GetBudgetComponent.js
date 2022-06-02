import { GetCookie } from "./cookie.js";
import API_Service from "../API/API_Service.js";

import { DefaultRender } from "./errorHandler.js";
export const Render = (root) => {
  root.innerHTML = "";

  var stringbudget = `
  <h1>List current budget</h1>
  <div id="DivWithBudget"></div>
  <div id="errorDiv"></div>`;

  root.innerHTML = stringbudget;


  fetchresult();

  function GenerateTable(budgetData) {


    let diven = document.getElementById("DivWithBudget");

    let titleTag = document.createElement("H2");
    let titleText = document.createTextNode(budgetData.budgetName);
    titleTag.appendChild(titleText);
    diven.appendChild(titleTag);

    let subTag = document.createElement("H4");
    let subText = document.createTextNode(`Total Budget:${budgetData.totalSum} Used Budget:${budgetData.usedAmount} Used Procent:${(parseInt(budgetData.usedAmount)*100/ parseInt(budgetData.totalSum)).toFixed(2)} %`);
    subTag.appendChild(subText);
    diven.appendChild(subTag);

    var categories = Object.keys(budgetData.budgetCategories);
    var categoriesvalues = Object.values(budgetData.budgetCategories);

    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");

    let row, cell;

    row = tbl.insertRow();
    cell = row.insertCell();
    cell.textContent = "Categories";
    cell.style.backgroundColor = "white";
    AddData(row, -1);

    row = tbl.insertRow();
    cell = row.insertCell();
    cell.textContent = "Cap";
    cell.style.backgroundColor = "white";
    AddData(row, 0);

    row = tbl.insertRow();
    cell = row.insertCell();
    cell.textContent = "Spent";
    cell.style.backgroundColor = "white";
    AddData(row, 1);

    row = tbl.insertRow();
    cell = row.insertCell();
    cell.textContent = "Amount Left";
    cell.style.backgroundColor = "white";
    AddData(row, 2);

    row = tbl.insertRow();
    cell = row.insertCell();
    cell.textContent = "Used procent";
    cell.style.backgroundColor = "white";
    AddData(row, 3);

    function AddData(row, int){
      for(var j = 0; j < categories.length; j++)
      {
        
        if(int == -1)
        {
          cell = row.insertCell();
          cell.textContent = categories[j];
        }
        else
        {
          
          cell = row.insertCell();
          cell.textContent = categoriesvalues[j][int];

          if(int === 3)
          {
            if(parseInt(categoriesvalues[j][int]) > 80 && parseInt(categoriesvalues[j][int]) < 100)
            {
              
              cell.style.color = "#FA532E";
              
            }
            else if (parseInt(categoriesvalues[j][int]) >= 100)
            {
              cell.style.color = "red";
            }
          }
          
        }
        cell.style.backgroundColor = "white";
      }
    }

    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    diven.appendChild(tbl);
    tbl.setAttribute("border","2");


  }

  async function fetchresult() {
    const fetchresult =  await API_Service.GetService("Budget");
    if(fetchresult != null){
      GenerateTable(fetchresult);
    }
  }
};



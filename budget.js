import { getCookie } from "./cookie.js";
import { DefaultRender } from "./errorHandler.js";
export const render = (root) => {
  root.innerHTML = "";

  const budgetForm = `
  <div class="header-div"><h1>Create budget</h1></div>
  <div id="budgetForm">
  <form id="form1">
      <label for="budgetName">Budget name:</label><br>
      <input type="text" id="budgetName" name="budgetName"><br>
      <label for="maxAmount">Budget total amount:</label>
      <input type="number" id="maxAmount"><br>
      <label for="budgetDate">Budget date:</label><br>
      <input type="date" id="budgetDate" name="budgetDate"><br>
      <label for="">Budget categories:</label>
      <label for="Food">Food:</label>
      <input type="number" id="Food"><br>
      <label for="Car">Car:</label>
      <input type="number" id="Car"><br>
      <label for="Subscriptions">Subscriptions:</label>
      <input type="number" id="Subscriptions"><br>
      <label for="Clothes">Clothes:</label>
      <input type="number" id="Clothes"><br>
      <label for="Treat">Treat:</label>
      <input type="number" id="Treat"><br>
      <label for="Other">Other:</label>
      <input type="number" id="Other"><br>
      
  </form>
  <button class="primarybtn">Submit</button>
</div>
<div id="errorDiv"></div>`;

  root.innerHTML = budgetForm;
  let budgetFormDiv = document.getElementById("budgetForm");

  budgetFormDiv.onclick = function (e) {
    //e.preventDefault();

    if (e.target.nodeName === "BUTTON") {
      const date = new Date(document.forms["form1"]["budgetDate"].value);
      let year = date.getFullYear();
      let month = date.getMonth();
      const newBudgetDTO = {
        name: document.forms["form1"]["budgetName"].value,
        totalSum: document.forms["form1"]["maxAmount"].value,
        month: month,
        year: year,
        categoriesAndAmount: {
          0: document.forms["form1"]["Food"].value,
          1: document.forms["form1"]["Car"].value,
          2: document.forms["form1"]["Subscriptions"].value,
          3: document.forms["form1"]["Clothes"].value,
          4: document.forms["form1"]["Treat"].value,
          5: document.forms["form1"]["Other"].value,
        },
      };
      var categoriesValues = Object.values(newBudgetDTO.categoriesAndAmount);
      var categoriesValuesInt = categoriesValues.map(Number);
      var testBelopp = categoriesValuesInt.reduce(function (a, b) {
        return a + b;
      }, 0)
      console.log(testBelopp)
      if (parseInt(newBudgetDTO.totalSum) === testBelopp) {
        PostBudget(newBudgetDTO);
        document.getElementById("form1").reset();
      }
      else
      {
        DefaultRender("Your budget amount does not match the total amount in the categories")
      }
      
    }
  };

  const PostBudget = async (newBudget) => {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(newBudget),
    };
    try {
      const response = await fetch(
        "http://localhost:7151/api/Budget/Create",
        settings
      );
      if (response.ok) {
        DefaultRender("Budget saved")
      } else {
        DefaultRender("Error with Status Code: " + response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

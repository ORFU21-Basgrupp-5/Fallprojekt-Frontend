import { getCookie } from "./cookie.js";
import { defaultRender } from "./errorHandler.js";
import API_Service from "./API_Service.js";

export const render = (root) => {
  root.innerHTML = "";

  const budgetForm = `
  <div id="budgetForm">
  <form id="form1">
      <div class="input">
        <label for="budgetName">Budget name</label><br>
        <input type="text" id="budgetName" name="budgetName">
      </div>
      <div class="input">
        <label for="maxAmount">Budget total amount</label><br>
        <input type="number" id="maxAmount">
      </div>
      <div class="input">
        <label for="budgetDate">Budget date</label><br>
        <input type="date" id="budgetDate" name="budgetDate">
      </div>
      <h3>Budget categories</h3>
      <div class="input">
        <label for="Food">Food</label><br>
        <input type="number" id="Food">
      </div>
      <div class="input">
        <label for="Car">Car</label><br>
        <input type="number" id="Car">
      </div>
      <div class="input">
        <label for="Subscriptions">Subscriptions</label><br>
        <input type="number" id="Subscriptions">
      </div>
      <div class="input">
        <label for="Clothes">Clothes</label><br>
        <input type="number" id="Clothes">
      </div>
      <div class="input">
        <label for="Treat">Treat</label><br>
        <input type="number" id="Treat">
      </div>
      <div class="input">
        <label for="Other">Other</label><br>
        <input type="number" id="Other">
      </div>
      
  </form>
  <button id="budgetSumbit">Submit</button>
</div>`;

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
      var categoriesvalues = Object.values(newBudgetDTO.categoriesAndAmount);
      var categoriesValuesInt = categoriesvalues.map(Number);
      var testBelop = categoriesValuesInt.reduce(function (a, b) {
        return a + b;
      }, 0)
      console.log(testBelop)
      if (parseInt(newBudgetDTO.totalSum) === testBelop) {
        if(fetchresult(newBudgetDTO)){
          document.getElementById("form1").reset();
          defaultRender("Din budget är sparad.");
        }else {
          defaultRender("Din budget är INTE sparad.")
        };
      }
      else
      {
        defaultRender("Ditt budget belopp matchar inte total belopet i kategorierna.")
      }
      
    }
  };

  async function fetchresult(newBudget) {
    const fetchresult =  await API_Service.PostService("Budget", newBudget);
    console.log(fetchresult);
    return fetchresult;
  }
};

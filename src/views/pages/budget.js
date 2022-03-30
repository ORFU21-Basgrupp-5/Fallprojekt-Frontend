import API_Service from "/src/services/API_Service.js";
import { defaultRender } from "/src/services/errorHandler.js";
import { setCookie } from "/src/services/cookie.js";

let Budget = {
  render : async () => {

    let view = `
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
    <button id="budgetSumbit">Submit</button>
  </div>
  <div id="errorDiv" class="errorMessage"></div>`;
    return view;
  }, after_render: async () => {
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
  }

}
export default Budget;
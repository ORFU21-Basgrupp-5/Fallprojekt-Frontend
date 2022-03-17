import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";
  
  const budgetForm = `
  <div id="budgetForm">
  <form>
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
      <button id="budgetSumbit">Submit</button>
  </form>
</div>`

  root.innerHTML = budgetForm;
  let budgetFormDiv = document.getElementById("budgetForm");
  budgetFormDiv.onclick = function (e) {
    if(clickedTarget.nodeName === "BUTTON")
    {
      const newBudgetDTO = {
        name: e.target[0].value,
        totalSum: e.target[1].value,
        month: e.target[2].getMonth(),
        year:   e.target[2].getYear(),
      }
      postBudget()
    }
  }

// {
//   "name": "string",
//   "totalSum": 0,
//   "month": 0,
//   "year": 0,
//   "categoriesAndAmount": {
//     "additionalProp1": 0,
//     "additionalProp2": 0,
//     "additionalProp3": 0
//   }
// }

   postBudget = async (newBudget) => {
     const settings = {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(newBudget)
     };
     try {
       const fetchResponse = await fetch("http://localhost:7151/api/Budget/Create",settings);
       const data = await fetchResponse.json();
       return data;
     }
     catch(e){
      console.log(e);
     }
   }
};

import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";
  
  const budgetForm = `
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
</div>`

  root.innerHTML = budgetForm;
  let budgetFormDiv = document.getElementById("budgetForm");
  budgetFormDiv.onclick = function (e) {
    //e.preventDefault();
    if(e.target.nodeName === "BUTTON")
    {
      const date = new Date(document.forms["form1"]["budgetDate"].value);
      let year = date.getFullYear()
      let month = date.getMonth()
      const newBudgetDTO = {
        name: document.forms["form1"]["budgetName"].value,
        totalSum: document.forms["form1"]["maxAmount"].value,
        month: month,
        year: year,
        categoriesAndAmount: {
          "0": document.forms["form1"]["Food"].value,
          "1": document.forms["form1"]["Car"].value,
          "2": document.forms["form1"]["Subscriptions"].value,
          "3": document.forms["form1"]["Clothes"].value,
          "4": document.forms["form1"]["Treat"].value,
          "5": document.forms["form1"]["Other"].value
        }

      }
      postBudget(newBudgetDTO)
    }
  }

   const postBudget = async (newBudget) => {
     const settings = {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(newBudget)
     };
     try {
       const response = await fetch("http://localhost:7151/api/Budget/Create",settings);
       if(response.ok){
         console.log("A ok!")
       }
       else{
        const message = 'Error with Status Code: ' + response.status;
        throw new Error(message);
       }
       
     }
     catch(e){
      console.log(e);
     }
   }

  
};

import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";

  var stringbudget = 
  `<h1>Lista Aktuell Budget</h1>
  <div id="DivWithBudget"></div>`;


  root.innerHTML = stringbudget;


budgetLista(getBudget());
  
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
  
  const getBudget = async () => {
    const settings = {
      method: 'GET',
      headers: {
       "Content-Type": "application/json",
       Authorization: "Bearer " + getCookie("token"),
     }
    
    };
    try {
      const response = await fetch("http://localhost:7151/api/Budget/RetrieveBudget",settings);
      if(response.ok){
        console.log("A ok!")
        const result = await response.json()
        return result;

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



}
 
 //get budget information
   //filter den pågående budgeten att visa
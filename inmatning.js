import { GetCookie } from "./cookie.js";

import { DefaultRender } from "./errorHandler.js";
import API_Service from "./API_Service.js";

export const Render = (root) => {
  root.innerHTML = "";
  // var stringExpenses = '<div><form id="Expenses"><div><p>Inmatning av expenseer</p></div><div id="info-expense"></div><div><label for = "Saldo"> Utgift, saldo:</label></div> <div>   <input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Utgift, konto:</label></div> <div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Utgift, beskrivning:</label></div><div>  <input type="text" id= "Description" name= description></div><div> <label for="Date">Utgift, datum:</label></div> <div><input type="date" id= "Date" name= date></div><div><button id= "expense">Enter</button></div</form></div>'
  // var stringIncomes = '<div><form id ="Incomes"><div><p>Inmatning av Incomes</p></div><div id="info-income"></div><div><label for = "Saldo"> Inkomst, saldo:</label></div><div><input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Inkomst, konto:</label></div><div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Inkomst, beskrivning:</label></div><div><input type="text" id= "Description" name= description></div><div><label for="Date">Utgift, datum:</label></div><div> <input type="date" id= "Date" name= date> </div><div><button id= "income">Enter</button></div></form></div>'

  const html = `
  <div id="pageContent">
    <div><h1>Incomes</h1></div>
    <div id="errorDiv"></div>
    <div id="info-income"></div>
      <form id="input-incomes">
        <div>
          <label>Category</label>
        </div>
        <select id="CategoryInc"></select>
        <div>
          <label for="ISaldo">Balance</label>
        </div>         
        <div>
          <input id="ISaldo">
        </div>
        <div>
          <label for="IKonto">Account</label>
        </div>
        <div>
          <input id="IKonto">
        </div>
        <div>
          <label for="IDesc">Description</label>
        </div>
        <div>
          <input id="IDesc">
        </div>
        <div>
          <label for="IDate">Date</label>
        </div>
        <div>
          <input id="IDate" type="date">
        </div>
        <div>
          <button id="ISubmit">Enter</button>
        </div>
      </form>
        <div>
          <h1>Expenses</h1>
        </div>
        <div id="info-expense"></div>
      <form id="input-expense">
        <div>
          <label>Category</label>
        </div>
        <select id="CategoryExp"></select>            
        <div>
          <label for="ESaldo">Balance</label>
        </div>
        <div>
          <input id="ESaldo">
        </div>
        <div>
          <label for="EKonto">Account</label>
        </div>
        <div>
          <input id="EKonto">
        </div>
        <div>
          <label for="EDesc">Description</label>
        </div>
        <div>
          <input id="EDesc">
        </div>
        <div>
          <label for="EDate">Date</label>
        </div>
        <div>
          <input id="EDate" type="date">
        </div>
        <div>
          <button id="ESubmit">Enter</button>
        </div>
    </form>
  </div>`;
                    
root.innerHTML = html;

  CategorySelectFetch("Expense", document.getElementById("CategoryExp"));
  CategorySelectFetch("Income", document.getElementById("CategoryInc"));
  
  let incomeForm = document.getElementById("input-incomes")
  let expenseForm = document.getElementById("input-expense")
  let incSubmit = document.getElementById("ISubmit");
  let expSubmit = document.getElementById("ESubmit");

  async function CategorySelectFetch(choice,catDiv){
    const fetchresult =  await API_Service.GetService(`${choice}/categories`);
    if(fetchresult != null){
      for(var i = 0; i < fetchresult.length; i++) {
        catDiv.innerHTML = catDiv.innerHTML + 
      '<option value="' + i + '">' + fetchresult[i] + '</option>';
    }
  }

  incSubmit.onclick = function (e) {
    e.preventDefault();
    if (isNaN(incomeForm.ISaldo.value))
    {
      IsInputNumber("income")
    }
    else if (incomeForm.IKonto.value === "" || incomeForm.IDesc.value === "" || incomeForm.IDate === "" || incomeForm.ISaldo.value === "") 
    {
      IsInputEmpty("income")
    }
    else {
    Income();
    }
  };
  expSubmit.onclick = function (e) {
    e.preventDefault();
    if (isNaN(expenseForm.ESaldo.value))
    {
      IsInputNumber("expense")
    }
    else if (expenseForm.EKonto.value === "" || expenseForm.EDesc.value === "" || expenseForm.EDate.value === "" || expenseForm.ESaldo.value === "") 
    {
      IsInputEmpty("expense")
    }
    else{
    Expense();
    }
  };

  const Income = (e) => {
    let Inc = document.getElementById("Incomes");
    console.log("Added income");
    const incinputsDTO = {
      incomeDate: Inc.IDate.value,
      incomeDescription: Inc.IDesc.value,
      incomeBalanceChange: Inc.ISaldo.value,
      accountId: Inc.IKonto.value,
      incomeCategory: parseInt(Inc.CategoryInc.value),
    };
    
    async function FetchInc() {
      
      const AddInc = await fetch(
        "http://localhost:7151/Income/AddIncome",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + GetCookie("token"),
          },
          body: JSON.stringify(incinputsDTO)
        }
      ).then((response) => {
        if (response.ok) {
          PrintAdded("income");
          return true;
        } else {
          return response.text().then(function(text) 
      {
        DefaultRender(`${text.status}`);
      })
        }
      })
      .catch((error) => { 
        debugger
        DefaultRender(`Error: ${error.message} `)
      })
    }
    FetchInc();
  };

  const Expense = (e) => {
    console.log("Added expense");
    let Exp = document.getElementById("Expenses")
    const expinputsDTO = {
      expenseDate: Exp.EDate.value,
      expenseDescription: Exp.EDesc.value,
      expenseBalanceChange: Exp.ESaldo.value,
      accountId: Exp.EKonto.value,
      expenseCategory: parseInt(Exp.CategoryExp.value),
    };
    async function FetchExp() {
  const addExp = await fetch(
    "http://localhost:7151/Expenses/AddExpense",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie("token"),
      },
      body: JSON.stringify(expinputsDTO)
    }
  ).then((response) => {
    if (response.ok) {
      PrintAdded("expense");
      return true;
    } 
    else {
      return response.text().then(function(text) 
      {
        DefaultRender(`${text.error}`);
      })
    }
  })
  .catch((error) => {  
    DefaultRender(`Error: ${error.message} `)
  })
}
FetchExp();
  };
  
};


function PrintAdded(string) {
  let divexpense = document.getElementById("info-expense");
  let divincome = document.getElementById("info-income");
  console.log(string);
  switch (string) {
    case "expense":
      DefaultRender("Added expense");
      
    case "income":
      DefaultRender("Added income");
      
      break;
    default:
      break;
  }
}
function IsInputNumber(string) {
  let divexpense = document.getElementById("info-expense");
  let divincome = document.getElementById("info-income");

  switch (string) {
    case "expense":
      DefaultRender("Balance must be indicated by numbers");
      
      break;
    case "income":
      DefaultRender("Balance must be indicated by numbers");
     
      break;
    default:
      break;
  }
}


function IsInputEmpty(string) {
  let divexpense = document.getElementById("info-expense");
  let divincome = document.getElementById("info-income");
  switch (string) {
    case "expense":
      DefaultRender("All fields must be filled in");
      
      break;
    case "income":
      DefaultRender("All fields must be filled in");
     
      break;
    default:
      break;
  }
}
}

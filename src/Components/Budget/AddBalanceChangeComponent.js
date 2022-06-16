import { GetCookie } from "../Services/cookie.js";
import { useState } from 'react';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from "../../API/API_Service.js";

const AddBalanceChange = () => {
  const [errorMessage, setMessage] = useState("");
  CategorySelectFetch("Expense", document.getElementById("CategoryExp"));
  CategorySelectFetch("Income", document.getElementById("CategoryInc"));

  let incomeForm = document.getElementById("input-incomes")
  let expenseForm = document.getElementById("input-expense")
  let incSubmit = document.getElementById("ISubmit");
  let expSubmit = document.getElementById("ESubmit");

  async function CategorySelectFetch(choice, catDiv) {
    try {
      const fetchresult = await API_Service.GetService(`${choice}/categories`);
      if (fetchresult != null) {
        for (var i = 0; i < fetchresult.length; i++) {
          catDiv.innerHTML = catDiv.innerHTML +
            '<option value="' + i + '">' + fetchresult[i] + '</option>';
        }
      }
    } catch {
      setMessage('Could not load categories.');
    }

    incSubmit.onclick = function (e) {
      e.preventDefault();
      if (isNaN(incomeForm.IAmount.value)) {
        IsInputNumber("income")
      }
      else if (incomeForm.IAccount.value === "" || incomeForm.IDesc.value === "" || incomeForm.IDate === "" || incomeForm.IAmount.value === "") {
        IsInputEmpty("income")
      }
      else {
        Income();
      }
    };
    expSubmit.onclick = function (e) {
      e.preventDefault();
      if (isNaN(expenseForm.EAmount.value)) {
        IsInputNumber("expense")
      }
      else if (expenseForm.EAccount.value === "" || expenseForm.EDesc.value === "" || expenseForm.EDate.value === "" || expenseForm.EAmount.value === "") {
        IsInputEmpty("expense")
      }
      else {
        Expense();
      }
    };
    const Income = (e) => {
      let Inc = document.getElementById("Incomes");
      console.log("Added income");
      const incinputsDTO = {
        incomeDate: Inc.IDate.value,
        incomeDescription: Inc.IDesc.value,
        incomeBalanceChange: Inc.IAmount.value,
        accountId: Inc.IAccount.value,
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
            return response.text().then(function (text) {
              setMessage(`${text.status}`);
            })
          }
        })
          .catch((error) => {
            debugger
            setMessage(`Error: ${error.message} `)
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
        expenseBalanceChange: Exp.EAmount.value,
        accountId: Exp.EAccount.value,
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
            return response.text().then(function (text) {
              setMessage(`${text.error}`);
            })
          }
        })
          .catch((error) => {
            setMessage(`Error: ${error.message} `)
          })
      }
      FetchExp();
    };

  };

  function PrintAdded(string) {
    // let divexpense = document.getElementById("info-expense");
    // let divincome = document.getElementById("info-income");
    console.log(string);
    switch (string) {
      case "expense":
        setMessage("Added expense");

      case "income":
        setMessage("Added income");

        break;
      default:
        break;
    }
  }
  function IsInputNumber(string) {
    // let divexpense = document.getElementById("info-expense");
    // let divincome = document.getElementById("info-income");
    switch (string) {
      case "expense":
        setMessage("Balance must be indicated by numbers");

        break;
      case "income":
        setMessage("Balance must be indicated by numbers");

        break;
      default:
        break;
    }
  }

  function IsInputEmpty(string) {
    // let divexpense = document.getElementById("info-expense");
    // let divincome = document.getElementById("info-income");
    switch (string) {
      case "expense":
        setMessage("All fields must be filled in");

        break;
      case "income":
        setMessage("All fields must be filled in");

        break;
      default:
        break;
    }
  }
  return (

    <div id="pageContent">
      <div><h1>Incomes</h1></div>
      <DefaultRender errorMessage={errorMessage} />
      <div id="info-income"></div>
      <form id="input-incomes">
        <div>
          <label>Category</label>
        </div>
        <select id="CategoryInc"></select>
        <div>
          <label for="IAmount">Balance</label>
        </div>
        <div>
          <input id="IAmount" />
        </div>
        <div>
          <label for="IAccount">Account</label>
        </div>
        <div>
          <input id="IAccount" />
        </div>
        <div>
          <label for="IDesc">Description</label>
        </div>
        <div>
          <input id="IDesc" />
        </div>
        <div>
          <label for="IDate">Date</label>
        </div>
        <div>
          <input id="IDate" type="date" />
        </div>
        <div>
          <button id="ISubmit">Enter</button>
        </div>
      </form>
      <div>
        <h1>Expenses</h1>
      </div>
      <DefaultRender errorMessage={errorMessage} />
      <div id="info-expense"></div>
      <form id="input-expense">
        <div>
          <label>Category</label>
        </div>
        <select id="CategoryExp"></select>
        <div>
          <label for="EAmount">Balance</label>
        </div>
        <div>
          <input id="EAmount" />
        </div>
        <div>
          <label for="EAccount">Account</label>
        </div>
        <div>
          <input id="EAccount" />
        </div>
        <div>
          <label for="EDesc">Description</label>
        </div>
        <div>
          <input id="EDesc" />
        </div>
        <div>
          <label for="EDate">Date</label>
        </div>
        <div>
          <input id="EDate" type="date" />
        </div>
        <div>
          <button id="ESubmit">Enter</button>
        </div>
      </form>
    </div>
  );

}

export default AddBalanceChange;

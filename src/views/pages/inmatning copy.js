import { getCookie } from "./src/services/cookie.js";
import { defaultRender } from "/src/services/errorHandler.js";
import API_Service from "./services/API_Service.js";
export const render = (root) => {
    root.innerHTML = "";
    // var stringUtgifter = '<div><form id="Utgifter"><div><p>Inmatning av utgifter</p></div><div id="info-utgift"></div><div><label for = "Saldo"> Utgift, saldo:</label></div> <div>   <input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Utgift, konto:</label></div> <div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Utgift, beskrivning:</label></div><div>  <input type="text" id= "Description" name= description></div><div> <label for="Date">Utgift, datum:</label></div> <div><input type="date" id= "Date" name= date></div><div><button id= "expense">Enter</button></div</form></div>'
    // var stringInkomster = '<div><form id ="Inkomster"><div><p>Inmatning av Inkomster</p></div><div id="info-inkomst"></div><div><label for = "Saldo"> Inkomst, saldo:</label></div><div><input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Inkomst, konto:</label></div><div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Inkomst, beskrivning:</label></div><div><input type="text" id= "Description" name= description></div><div><label for="Date">Utgift, datum:</label></div><div> <input type="date" id= "Date" name= date> </div><div><button id= "income">Enter</button></div></form></div>'

    const html = `
  <div id="pageContent">
    <div><h1>Inkomster</h1></div>
    <div id="errorDiv"></div>
    <div id="info-inkomst"></div>
      <form id="Inkomster">
        <div>
          <label>Category</label>
        </div>
        <select id="CategoryInc"></select>
        <div>
          <label for="ISaldo">Saldo</label>
        </div>         
        <div>
          <input id="ISaldo">
        </div>
        <div>
          <label for="IKonto">Konto</label>
        </div>
        <div>
          <input id="IKonto">
        </div>
        <div>
          <label for="IDesc">Desc</label>
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
          <h1>Utgifter</h1>
        </div>
        <div id="info-utgift"></div>
      <form id="Utgifter">
        <div>
          <label>Category</label>
        </div>
        <select id="CategoryExp"></select>            
        <div>
          <label for="ESaldo">Saldo</label>
        </div>
        <div>
          <input id="ESaldo">
        </div>
        <div>
          <label for="EKonto">Konto</label>
        </div>
        <div>
          <input id="EKonto">
        </div>
        <div>
          <label for="EDesc">Desc</label>
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
  </div>
  <div  class="spacer3"> . </div>`;

    root.innerHTML = html;

    categorySelectFetch("Expense", document.getElementById("CategoryExp"));
    categorySelectFetch("Income", document.getElementById("CategoryInc"));

    let IncomeForm = document.getElementById("Inkomster");
    let ExpenseForm = document.getElementById("Utgifter");
    let IncSubmit = document.getElementById("ISubmit");
    let ExpSubmit = document.getElementById("ESubmit");

    async function categorySelectFetch(choice, catDiv) {
        const fetchresult = await API_Service.GetService(
            `${choice}/categories`
        );
        if (fetchresult != null) {
            for (var i = 0; i < fetchresult.length; i++) {
                catDiv.innerHTML =
                    catDiv.innerHTML +
                    '<option value="' +
                    i +
                    '">' +
                    fetchresult[i] +
                    "</option>";
            }
        }

        IncSubmit.onclick = function (e) {
            e.preventDefault();
            if (isNaN(IncomeForm.ISaldo.value)) {
                IsInputNumber("inkomst");
            } else if (
                IncomeForm.IKonto.value === "" ||
                IncomeForm.IDesc.value === "" ||
                IncomeForm.IDate === "" ||
                IncomeForm.ISaldo.value === ""
            ) {
                IsInputEmpty("inkomst");
            } else {
                income();
            }
        };
        ExpSubmit.onclick = function (e) {
            e.preventDefault();
            if (isNaN(ExpenseForm.ESaldo.value)) {
                IsInputNumber("utgift");
            } else if (
                ExpenseForm.EKonto.value === "" ||
                ExpenseForm.EDesc.value === "" ||
                ExpenseForm.EDate.value === "" ||
                ExpenseForm.ESaldo.value === ""
            ) {
                IsInputEmpty("utgift");
            } else {
                expense();
            }
        };

        const income = (e) => {
            let Inc = document.getElementById("Inkomster");
            console.log("Du lade till en inkomst");
            const incinputsDTO = {
                incomeDate: Inc.IDate.value,
                incomeDescription: Inc.IDesc.value,
                incomeBalanceChange: Inc.ISaldo.value,
                accountId: Inc.IKonto.value,
                incomeCategory: parseInt(Inc.CategoryInc.value),
            };

            async function fetchInc() {
                const AddInc = await fetch(
                    "http://localhost:7151/Income/AddIncome",
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + getCookie("token"),
                        },
                        body: JSON.stringify(incinputsDTO),
                    }
                )
                    .then((response) => {
                        if (response.ok) {
                            PrintAdded("inkomst");
                            return true;
                        } else {
                            return response.text().then(function (text) {
                                defaultRender(`${text.status}`);
                            });
                        }
                    })
                    .catch((error) => {
                        debugger;
                        defaultRender(`Error: ${error.message} `);
                    });
            }
            fetchInc();
        };

        const expense = (e) => {
            console.log("Du lade till en utgift");
            let Exp = document.getElementById("Utgifter");
            const expinputsDTO = {
                expenseDate: Exp.EDate.value,
                expenseDescription: Exp.EDesc.value,
                expenseBalanceChange: Exp.ESaldo.value,
                accountId: Exp.EKonto.value,
                expenseCategory: parseInt(Exp.CategoryExp.value),
            };
            async function fetchExp() {
                const AddExp = await fetch(
                    "http://localhost:7151/Expenses/AddExpense",
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + getCookie("token"),
                        },
                        body: JSON.stringify(expinputsDTO),
                    }
                )
                    .then((response) => {
                        if (response.ok) {
                            PrintAdded("utgift");
                            return true;
                        } else {
                            return response.text().then(function (text) {
                                defaultRender(`${text.error}`);
                            });
                        }
                    })
                    .catch((error) => {
                        defaultRender(`Error: ${error.message} `);
                    });
            }
            fetchExp();
        };
    }

    function PrintAdded(string) {
        console.log(string);
        switch (string) {
            case "utgift":
                defaultRender("Du har lagt till en utgift");
                break;
            case "inkomst":
                defaultRender("Du har lagt till en inkomst");
                break;
            default:
                break;
        }
    }
    function IsInputNumber(string) {
        switch (string) {
            case "utgift":
                defaultRender("Saldo måste anges med siffror");
                break;
            case "inkomst":
                defaultRender("Saldo måste anges med siffror");
                break;
            default:
                break;
        }
    }

    function IsInputEmpty(string) {
        switch (string) {
            case "utgift":
                defaultRender("Samtliga fält måste fyllas i");
                break;
            case "inkomst":
                defaultRender("Samtliga fält måste fyllas i");
                break;
            default:
                break;
        }
    }
};

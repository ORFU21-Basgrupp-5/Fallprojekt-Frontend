import API_Service from '/services/API_Service.js';
import { defaultRender } from "/services/errorHandler.js";
import { getCookie } from "/services/cookie.js";

let Inmatning = {
    render: async () => {
        let view = `
        <div class="input-container">
        <div id="inkomster-container">
            <h1>Inkomster</h1>
            <div id="errorDiv" class="errorMessage"></div>
            <div id="info-inkomst"></div>
            <form id="Inkomster" class="inputForm">
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
                    <button class="submit_button" id="ISubmit">Enter</button>
                </div>
            </form>
            </div>
            <div id="utgifter-container">
                    <h1>Utgifter</h1>               
            <div id="info-utgift"></div>
            <form id="Utgifter" class="inputForm">
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
                    <button class="submit_button" id="ESubmit">Enter</button>
                </div>
        </form>
        </div>
      </div>
    `;
        return view;
    },
    after_render: async () => {
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
                        "http://localhost:7151/api/Income/",
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
                        "http://localhost:7151/api/Expense/",
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
    },
};
export default Inmatning;

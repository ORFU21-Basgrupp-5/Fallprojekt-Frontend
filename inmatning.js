import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";
  // var stringUtgifter = '<div><form id="Utgifter"><div><p>Inmatning av utgifter</p></div><div id="info-utgift"></div><div><label for = "Saldo"> Utgift, saldo:</label></div> <div>   <input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Utgift, konto:</label></div> <div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Utgift, beskrivning:</label></div><div>  <input type="text" id= "Description" name= description></div><div> <label for="Date">Utgift, datum:</label></div> <div><input type="date" id= "Date" name= date></div><div><button id= "expense">Enter</button></div</form></div>'
  // var stringInkomster = '<div><form id ="Inkomster"><div><p>Inmatning av Inkomster</p></div><div id="info-inkomst"></div><div><label for = "Saldo"> Inkomst, saldo:</label></div><div><input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Inkomst, konto:</label></div><div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Inkomst, beskrivning:</label></div><div><input type="text" id= "Description" name= description></div><div><label for="Date">Utgift, datum:</label></div><div> <input type="date" id= "Date" name= date> </div><div><button id= "income">Enter</button></div></form></div>'

  let elementStrings = [
    "label",
    "input",
    "label",
    "input",
    "label",
    "input",
    "label",
    "input",
    "button",
  ];

  let attributes = [
    "for",
    "Saldo",
    "id",
    "Saldo",
    "for",
    "Konto",
    "id",
    "Konto",
    "for",
    "Desc",
    "id",
    "Desc",
    "for",
    "Date",
    "id",
    "Date",
    "id",
    "Submit",
  ];

  let pageContent = document.getElementById("pageContent");

  let IncomeForm = document.createElement("form");
  IncomeForm.setAttribute("id", "Inkomster");

  let ExpenseForm = document.createElement("form");
  ExpenseForm.setAttribute("id", "Utgifter");

  let divutgift = document.createElement("div");
  divutgift.setAttribute("id", "info-utgift");

  let divinkomst = document.createElement("div");
  divinkomst.setAttribute("id", "info-inkomst");

  const inkomsterHeader = document.createElement("d");
  const inkomsterText = document.createTextNode("Inkomster");
  const inkomsterH3 = document.createElement("h3");
  inkomsterHeader.appendChild(inkomsterH3);
  inkomsterH3.appendChild(inkomsterText);

  const utgifterHeader = document.createElement("d");
  const utgifterText = document.createTextNode("Utgifter");
  const utgifterH3 = document.createElement("h3");
  utgifterHeader.appendChild(utgifterH3);
  utgifterH3.appendChild(utgifterText);

  const categorySelect = document.createElement("select");
  categorySelect.setAttribute("id", "CategoryExp");
  const opt1 = document.createElement("option");
  opt1.setAttribute("value", 0);
  opt1.innerHTML = "Food";
  const opt2 = document.createElement("option");
  opt2.setAttribute("value", 1);
  opt2.innerHTML = "Car";
  const opt3 = document.createElement("option");
  opt3.setAttribute("value", 2);
  opt3.innerHTML = "Subscriptions";
  const opt4 = document.createElement("option");
  opt4.setAttribute("value", 3);
  opt4.innerHTML = "Clothes";
  const opt5 = document.createElement("option");
  opt5.setAttribute("value", 4);
  opt5.innerHTML = "Treat";
  const opt6 = document.createElement("option");
  opt6.setAttribute("value", 5);
  opt6.innerHTML = "Other";

  let div = document.createElement("div");
  let categorylabel = document.createElement("label");
  categorylabel.innerHTML = "Category";
  div.appendChild(categorylabel);
  categorySelect.appendChild(opt1);
  categorySelect.appendChild(opt2);
  categorySelect.appendChild(opt3);
  categorySelect.appendChild(opt4);
  categorySelect.appendChild(opt5);
  categorySelect.appendChild(opt6);

  const categorySelect2 = document.createElement("select");
  categorySelect2.setAttribute("id", "CategoryInc");
  const Incopt1 = document.createElement("option");
  Incopt1.setAttribute("value", 0);
  Incopt1.innerHTML = "Income";
  const Incopt2 = document.createElement("option");
  Incopt2.setAttribute("value", 1);
  Incopt2.innerHTML = "CSN";
  const Incopt3 = document.createElement("option");
  Incopt3.setAttribute("value", 2);
  Incopt3.innerHTML = "Shares";
  const Incopt4 = document.createElement("option");
  Incopt4.setAttribute("value", 3);
  Incopt4.innerHTML = "Swish";
  const Incopt5 = document.createElement("option");
  Incopt5.setAttribute("value", 4);
  Incopt5.innerHTML = "Other";

  let div2 = document.createElement("div");
  let categorylabel2 = document.createElement("label");
  categorylabel2.innerHTML = "Category";
  div2.appendChild(categorylabel2);
  categorySelect2.appendChild(Incopt1);
  categorySelect2.appendChild(Incopt2);
  categorySelect2.appendChild(Incopt3);
  categorySelect2.appendChild(Incopt4);
  categorySelect2.appendChild(Incopt5);

  IncomeForm.appendChild(div2);
  IncomeForm.appendChild(categorySelect2);
  ExpenseForm.appendChild(div);
  ExpenseForm.appendChild(categorySelect);

  pageContent.appendChild(inkomsterHeader);
  pageContent.appendChild(divinkomst);
  pageContent.appendChild(IncomeForm);
  pageContent.appendChild(utgifterHeader);
  pageContent.appendChild(divutgift);
  pageContent.appendChild(ExpenseForm);

  SetAttributes(elementStrings, attributes, "I", IncomeForm);
  SetAttributes(elementStrings, attributes, "E", ExpenseForm);

  let IncSubmit = document.getElementById("ISubmit");
  let ExpSubmit = document.getElementById("ESubmit");

  IncSubmit.onclick = function (e) {
    e.preventDefault();
    income();
  };
  ExpSubmit.onclick = function (e) {
    e.preventDefault();
    expense();
  };

  const income = (e) => {
    let Inc = document.getElementById("Inkomster");
    console.log("Du lade till en inkomst");
    PrintAdded("inkomst");
    const incinputsDTO = {
      Incsaldo: Inc.ISaldo.value,
      Inckonto: Inc.IKonto.value,
      Incdescription: Inc.IDesc.value,
      Incdate: Inc.IDate.value,
      CategoryIncome: Inc.CategoryInc.value,
    };
    fetchInc();
  };

  const expense = (e) => {
    console.log("Du lade till en utgift");
    PrintAdded("utgift");
    let Exp = document.getElementById("Utgifter")
    const expinputsDTO = {
      Expsaldo: Exp.ESaldo.value,
      Expkonto: Exp.EKonto.value,
      Expdescription: Exp.EDesc.value,
      Expdate: Exp.EDate.value,
      CategoryExpense: Exp.CategoryExp.value,
    };
    fetchExp();
  };
};

function SetAttributes(arr, arr2, letter, form) {
  let attnum = 0;
  let elements = [];
  for (let index = 0; index < arr.length; index++) {
    let element = document.createElement(arr[index]);
    elements.push(element);
    elements[index].setAttribute(arr2[attnum], letter + arr2[attnum + 1]);
    if ((index % 2 == 0 && index !== 8) || index == 7) {
      elements[index].innerHTML = arr2[attnum + 1];
    }
    if (index == 7) {
      elements[index].setAttribute("type", "date");
    } else if (index == 8) {
      elements[index].innerHTML = "Enter";
    }
    attnum += 2;
  }
  AppendElements(elements, form);
}

function AppendElements(arr, form) {
  arr.forEach((x) => {
    var d = document.createElement("div");
    form.appendChild(d).appendChild(x);
  });
}

function PrintAdded(string) {
  let divutgift = document.getElementById("info-utgift");
  let divinkomst = document.getElementById("info-inkomst");
  console.log(string);
  switch (string) {
    case "utgift":
      divutgift.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode("Du har lagt till en utgift."))
      );
      setTimeout(function () {
        divutgift.removeChild(divutgift.lastChild);
      }, 2000);
      break;
    case "inkomst":
      divinkomst.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode("Du har lagt till en inkomst."))
      );
      setTimeout(function () {
        divinkomst.removeChild(divinkomst.lastChild);
      }, 2000);
      break;
    default:
      break;
  }
}


async function fetchExp() {
  const AddExp = await fetch(
    "http://localhost:7151/Expenses/AddExpense",
   
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(expinputsDTO)
    }
  ).then((response) => {
    if (response.ok) {
      return true;
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  });
}
async function fetchInc() {
  const AddInc = await fetch(
    "http://localhost:7151/Income/AddIncome",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(incinputsDTO)
    }
  ).then((response) => {
    if (response.ok) {
      return true;
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  });
}

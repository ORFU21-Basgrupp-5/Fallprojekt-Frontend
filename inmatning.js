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
  opt1.setAttribute("value", "");
  opt1.innerHTML = "-- Select -- " ;
 

  let div = document.createElement("div");
  let categorylabel = document.createElement("label");
  categorylabel.innerHTML = "Category";
  div.appendChild(categorylabel);
  categorySelect.appendChild(opt1);


  const categorySelect2 = document.createElement("select");
  categorySelect2.setAttribute("id", "CategoryInc");
  const Incopt1 = document.createElement("option");
 
  
  Incopt1.setAttribute("value", "");
  Incopt1.innerHTML = "-- Select --";
  categorySelect2.appendChild(opt1);
  categorySelectFetch("Expenses",categorySelect);
  categorySelectFetch("Income",categorySelect2);
  //categorySelect("Expenses",categorySelect1)
  function categorySelectFetch(choice,catDiv){
    fetch("http://localhost:7151/" + choice +"/categories", 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Add authorization if custom categorys are added.
      },

    })
    .then((response) => {
      if (response.ok) {
        return response.json();
        
      } else {
        throw new Error("No categorySelect respons ERROR");
      }
    })
    .then((data) => {
      for(var i = 0; i < data.length; i++) {
        catDiv.innerHTML = catDiv.innerHTML + 
        '<option value="' + i + '">' + data[i] + '</option>';
      }
      
    })
  }

  let div2 = document.createElement("div");
  let categorylabel2 = document.createElement("label");
  categorylabel2.innerHTML = "Category";
  div2.appendChild(categorylabel2);
 

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
    if (isNaN(IncomeForm.ISaldo.value))
    {
      renderError("inkomst")
    }
    else if (IncomeForm.IKonto.value === "" || IncomeForm.IDesc.value === "" || IncomeForm.IDate === "" || IncomeForm.ISaldo.value === "") 
    {
      renderErrorEmpty("inkomst")
    }
    else {
    income();
    }
  };
  ExpSubmit.onclick = function (e) {
    e.preventDefault();
    if (isNaN(ExpenseForm.ESaldo.value))
    {
      renderError("utgift")
    }
    else if (ExpenseForm.EKonto.value === "" || ExpenseForm.EDesc.value === "" || ExpenseForm.EDate.value === "" || ExpenseForm.ESaldo.value === "") 
    {
      renderErrorEmpty("utgift")
    }
    else{
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
          body: JSON.stringify(incinputsDTO)
        }
      ).then((response) => {
        if (response.ok) {
          PrintAdded("inkomst");
          return true;
        } else {
          return response.text().then(function(text) 
      {
        renderErrorBodyIncome(`${response.status} ${response.statusText} ${text}`);
      })
        }
      })
      .catch((error) => {  
        renderError(`Error: ${error.message} `)
      })
    }
    fetchInc();
  };

  const expense = (e) => {
    console.log("Du lade till en utgift");
    let Exp = document.getElementById("Utgifter")
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
      body: JSON.stringify(expinputsDTO)
    }
  ).then((response) => {
    if (response.ok) {
      PrintAdded("utgift");
      return true;
    } 
    else {
      return response.text().then(function(text) 
      {
        renderErrorBodyExpense(`${response.status} ${response.statusText} ${text}`);
      })
    }
  })
  .catch((error) => {  
    renderError(`Error: ${error.message} `)
  })
}
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

const renderErrorBodyIncome = function(msg){
  const IncError = document.getElementById('Inkomster')
  IncError.insertAdjacentText('beforeend', msg)
  setTimeout(function () {
    IncError.removeChild(IncError.lastChild);
  }, 2000)
}

const renderErrorBodyExpense = function(msg){
  const ExpError = document.getElementById('Utgifter')
  ExpError.insertAdjacentText('beforeend', msg)
  setTimeout(function () {
    ExpError.removeChild(ExpError.lastChild);
  }, 2000)
}

function renderError(string) {
  let divutgift = document.getElementById("info-utgift");
  let divinkomst = document.getElementById("info-inkomst");
  switch (string) {
    case "utgift":
      divutgift.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode("Saldo måste anges med siffror"))
      );
      setTimeout(function () {
        divutgift.removeChild(divutgift.lastChild);
      }, 2000);
      break;
    case "inkomst":
      divinkomst.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode("Saldo måste anges med siffror"))
      );
      setTimeout(function () {
        divinkomst.removeChild(divinkomst.lastChild);
      }, 2000);
      break;
    default:
      break;
  }
}

function renderErrorEmpty(string) {
  let divutgift = document.getElementById("info-utgift");
  let divinkomst = document.getElementById("info-inkomst");
  switch (string) {
    case "utgift":
      divutgift.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode("Samtliga fält måste fyllas i"))
      );
      setTimeout(function () {
        divutgift.removeChild(divutgift.lastChild);
      }, 2000);
      break;
    case "inkomst":
      divinkomst.appendChild(
        document
          .createElement("p")
          .appendChild(document.createTextNode("Samtliga fält måste fyllas i"))
      );
      setTimeout(function () {
        divinkomst.removeChild(divinkomst.lastChild);
      }, 2000);
      break;
    default:
      break;
  }
}


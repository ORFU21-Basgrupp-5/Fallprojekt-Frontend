export const render = (root) => {
  root.innerHTML = '';
  // var stringUtgifter = '<div><form id="Utgifter"><div><p>Inmatning av utgifter</p></div><div id="info-utgift"></div><div><label for = "Saldo"> Utgift, saldo:</label></div> <div>   <input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Utgift, konto:</label></div> <div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Utgift, beskrivning:</label></div><div>  <input type="text" id= "Description" name= description></div><div> <label for="Date">Utgift, datum:</label></div> <div><input type="date" id= "Date" name= date></div><div><button id= "expense">Enter</button></div</form></div>'
  // var stringInkomster = '<div><form id ="Inkomster"><div><p>Inmatning av Inkomster</p></div><div id="info-inkomst"></div><div><label for = "Saldo"> Inkomst, saldo:</label></div><div><input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Inkomst, konto:</label></div><div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Inkomst, beskrivning:</label></div><div><input type="text" id= "Description" name= description></div><div><label for="Date">Utgift, datum:</label></div><div> <input type="date" id= "Date" name= date> </div><div><button id= "income">Enter</button></div></form></div>'
  
  let elem = [
    "label",
    "input",
    "label",
    "input",
    "label",
    "input",
    "label",
    "input",
    "button"
  ]

  let attri = [
    "for", "Saldo",
    "id", "Saldo",
    "for", "Konto",
    "id", "Konto",
    "for", "Desc",
    "id", "Desc",
    "for", "Date",
    "id", "Date",
    "id", "Submit"
  ]
  
  let pageContent = document.getElementById("pageContent")

  let IncomeForm = document.createElement("form")
  IncomeForm.setAttribute("id", "Inkomster")

  let ExpenseForm = document.createElement("form")
  ExpenseForm.setAttribute("id", "Utgifter")

  let divutgift = document.createElement("div")
  divutgift.setAttribute("id", "info-utgift")

  let divinkomst = document.createElement("div")
  divinkomst.setAttribute("id", "info-inkomst")

  const inkomsterHeader = document.createElement('d')
  const inkomsterText = document.createTextNode('Inkomster')
  const inkomsterH3 = document.createElement('h3')
  inkomsterHeader.appendChild(inkomsterH3)
  inkomsterH3.appendChild(inkomsterText)

  const utgifterHeader = document.createElement('d')
  const utgifterText = document.createTextNode('Utgifter')
  const utgifterH3 = document.createElement('h3')
  utgifterHeader.appendChild(utgifterH3)
  utgifterH3.appendChild(utgifterText)


  pageContent.appendChild(inkomsterHeader)
  pageContent.appendChild(divinkomst)
  pageContent.appendChild(IncomeForm)
  pageContent.appendChild(utgifterHeader)
  pageContent.appendChild(divutgift)
  pageContent.appendChild(ExpenseForm)

  SetAttribuites(elem, attri, "I", IncomeForm)
  SetAttribuites(elem, attri, "E", ExpenseForm)

  let IncSubmit = document.getElementById("ISubmit")
  let ExpSubmit = document.getElementById("ESubmit")

  IncSubmit.onclick = function(e) {
    e.preventDefault()
    income();
  }
  ExpSubmit.onclick = function(e) {
    e.preventDefault()
    expense();
  }
  
const income = (e) => {
  let Inc = document.getElementById("Inkomster")
  console.log("Du lade till en inkomst")
  PrintAdded("inkomst");
  let incinputs = {
      Incsaldo: Inc.ISaldo.value,
      Inckonto:Inc.IKonto.value,
      Incdescription: Inc.IDesc.value,
      Incdate: Inc.IDate.value
  }
  fetchInc(incinputs)
}

const expense = (e) => {
  console.log("Du lade till en utgift")
  PrintAdded("utgift");
  let expinputs = {
      Expsaldo: Exp.ESaldo.value,
      Expkonto:  Exp.EKonto.value,
      Expdescription: Exp.EDesc.value,
      Expdate: Exp.EDate.value
    }
  fetchExp(expinputs)
  }
}

function SetAttribuites(arr, arr2, letter, form){
  let attnum = 0;
  let elements = []
  for (let index = 0; index < arr.length; index++) {
    let element = document.createElement(arr[index])
    elements.push(element)
    elements[index].setAttribute(arr2[attnum], letter + arr2[attnum + 1]);
    if(index % 2 == 0 && index !== 8 || index == 7){
      elements[index].innerHTML = arr2[attnum+1];
    }
    if(index == 7){
      elements[index].setAttribute("type", "date")
    } else if(index == 8){
      elements[index].innerHTML = "Enter"
    }
    attnum += 2;
  }
  AppendElements(elements, form)
}

function AppendElements(arr, form){
  arr.forEach(x => {
    var d = document.createElement("div")
    form.appendChild(d).appendChild(x)
  })
}

function PrintAdded(string){
    let divutgift = document.getElementById("info-utgift");
    let divinkomst = document.getElementById("info-inkomst");
    console.log(string);
    switch (string) {
      case "utgift":
        divutgift.appendChild(document.createElement("p").appendChild(document.createTextNode("Du har lagt till en utgift.")));
        setTimeout(function(){
          divutgift.removeChild(divutgift.lastChild);
        }, 2000);
        break;
      case "inkomst":
        divinkomst.appendChild(document.createElement("p").appendChild(document.createTextNode("Du har lagt till en inkomst.")));
        setTimeout(function(){
          divinkomst.removeChild(divinkomst.lastChild);
        }, 2000);
        break;
      default:
        break;
    }
  }

  async function fetchExp(expinputs){  
    
    const AddExp = await fetch('https://localhost:7151/Expenses/AddExpense?'+'saldo='+expinputs.Expsaldo+'&AccountId='+expinputs.Expkonto+'&description='+expinputs.Expdescription+'&date='+expinputs.Expdate, {
        method: "PUT", 
        headers: {
          'Content-Type': 'application/json'
        }})
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
    }
    async function fetchInc(incinputs){  
        const AddInc = await fetch('https://localhost:7151/Income/AddIncome?'+'saldo='+incinputs.Incsaldo+'&AccountId='+incinputs.Inckonto+'&description='+incinputs.Incdescription+'&date='+incinputs.Incdate, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((response) => {
            if (response.ok) {
                return true;
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
            })
        }
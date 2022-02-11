export const render = (root) => {
    root.innerHTML = '';
    // var stringUtgifter = '<div><form id="Utgifter"><div><p>Inmatning av utgifter</p></div><div id="info-utgift"></div><div><label for = "Saldo"> Utgift, saldo:</label></div> <div>   <input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Utgift, konto:</label></div> <div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Utgift, beskrivning:</label></div><div>  <input type="text" id= "Description" name= description></div><div> <label for="Date">Utgift, datum:</label></div> <div><input type="date" id= "Date" name= date></div><div><button id= "expense">Enter</button></div</form></div>'
    // var stringInkomster = '<div><form id ="Inkomster"><div><p>Inmatning av Inkomster</p></div><div id="info-inkomst"></div><div><label for = "Saldo"> Inkomst, saldo:</label></div><div><input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Inkomst, konto:</label></div><div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Inkomst, beskrivning:</label></div><div><input type="text" id= "Description" name= description></div><div><label for="Date">Utgift, datum:</label></div><div> <input type="date" id= "Date" name= date> </div><div><button id= "income">Enter</button></div></form></div>'

    let pageContent = document.getElementById("pageContent")
    let IncomeForm = document.createElement("form")
    IncomeForm.setAttribute("id", "Inkomster")
    let divutgift = document.createElement("div")
    divutgift.setAttribute("id", "info-utgift")

    let divinkomst = document.createElement("div")
    divinkomst.setAttribute("id", "info-inkomst")
    
    let elem = [
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("button")
    ]
    let elem2 = [
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("label"),
        document.createElement("input"),
        document.createElement("button")
    ]
    let attri = [
        "for", "ESaldo",
        "id", "ESaldo",
        "for", "EKonto",
        "id", "EKonto",
        "for", "EDesc",
        "id", "EDesc",
        "for", "EDate",
        "id", "EDate",
        "id", "ESubmit"
    ]
    let attri2 = [
        "for", "ISaldo",
        "id", "ISaldo",
        "for", "IKonto",
        "id", "IKonto",
        "for", "IDesc",
        "id", "IDesc",
        "for", "IDate",
        "id", "IDate",
        "id", "ISubmit"
    ]
    elem[0].innerHTML = "Saldo :"
    elem[2].innerHTML = "Konto :"
    elem[4].innerHTML = "Desc :"
    elem[6].innerHTML = "Datum :"
    elem[7].setAttribute("type", "date")
    elem[8].innerHTML = "Expense"
    let attnum = 0;
    for (let index = 0; index < elem.length; index++) {
        elem[index].setAttribute(attri[attnum], attri[attnum + 1])
        attnum += 2;
    }

    elem2[0].innerHTML = "Saldo :"
    elem2[2].innerHTML = "Konto :"
    elem2[4].innerHTML = "Desc :"
    elem2[6].innerHTML = "Datum :"
    elem2[7].setAttribute("type", "date")
    elem2[8].innerHTML = "Income"
    let attnum2 = 0;
    for (let index = 0; index < elem.length; index++) {
        elem2[index].setAttribute(attri2[attnum2], attri2[attnum2 + 1])
        attnum2 += 2;
    }
    pageContent.appendChild(divutgift)
    pageContent.appendChild(divinkomst)

    elem.forEach(x => {
        var d = document.createElement("div")
        pageContent.appendChild(d).appendChild(x)
    })
    elem2.forEach(x => {
        var d = document.createElement("div")
        pageContent.appendChild(d).appendChild(x)
    })
    let Exp = document.getElementById("Utgifter")
    
    let IncSubmit = document.getElementById("ISubmit")
    let ExpSubmit = document.getElementById("ESubmit")
    
    ExpSubmit.addEventListener('click', () => {
      expense();
  })

  IncSubmit.addEventListener('click', () => {
    income();
})

const income = (e) =>
  {
    let Inc = document.getElementById("Inkomster")
    console.log("Du lade till en inkomst")
    PrintAdded("inkomst");
    let incinputs = {
        Incsaldo: Inc.Saldo.value,
        Inckonto:Inc.Konto.value,
        Incdescription: Inc.Description.value,
        Incdate: Inc.Date.value
        }
        fetchInc(incinputs)
  }

const expense = (e) =>
    {
        // e.preventDefault()
        console.log("Du lade till en utgift")
        PrintAdded("utgift");
        let expinputs = {
            Expsaldo: Exp.Saldo.value,
            Expkonto:  Exp.Konto.value,
            Expdate: Exp.Date.value,
            Expdescription: Exp.Description.value
        }
        fetchExp(expinputs)
    }
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






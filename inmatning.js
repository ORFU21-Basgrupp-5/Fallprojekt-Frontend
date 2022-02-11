export const render = (root) => {
    root.innerHTML = '';
    var stringUtgifter = '<div><form id="Utgifter"><div><p>Inmatning av utgifter</p></div><div id="info-utgift"></div><div><label for = "Saldo"> Utgift, saldo:</label></div> <div>   <input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Utgift, konto:</label></div> <div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Utgift, beskrivning:</label></div><div>  <input type="text" id= "Description" name= description></div><div> <label for="Date">Utgift, datum:</label></div> <div><input type="date" id= "Date" name= date></div><div><button id= "expense">Enter</button></div</form></div>'
    var stringInkomster = '<div><form id ="Inkomster"><div><p>Inmatning av Inkomster</p></div><div id="info-inkomst"></div><div><label for = "Saldo"> Inkomst, saldo:</label></div><div><input type = "text" id= "Saldo" name= saldo></div><div><label for="Konto">Inkomst, konto:</label></div><div><input type="text" id= "Konto" name= konto></div><div><label for="Description">Inkomst, beskrivning:</label></div><div><input type="text" id= "Description" name= description></div><div><label for="Date">Utgift, datum:</label></div><div> <input type="date" id= "Date" name= date> </div><div><button id= "income">Enter</button></div></form></div>'
    

    root.innerHTML = stringUtgifter + stringInkomster;
    let Exp = document.getElementById("Utgifter")
    
    let Expbutton = document.getElementById("expense")
    let Incbutton = document.getElementById("income")
    
    Incbutton.addEventListener('click', () => {
      income()
  })
    // Exp.appendChild(Expbutton)
    // Inc.appendChild(Incbutton)

    

    
const income = (e) =>
  {
    let Inc = document.getElementById("Inkomster")
    alert(e.target[1].value)
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

  Exp.onsubmit = (e) =>
    {
        e.preventDefault()
        console.log("Du lade till en utgift")
        PrintAdded("utgift");
        let expinputs = {
            Expdate: Exp.Date.value,
            Expsaldo: Exp.Saldo.value,
            Expkonto:  Exp.Konto.value,
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







let Exp = document.getElementById("Utgifter")
let Inc = document.getElementById("Inkomster")
let Expbutton = document.getElementById("expense")
let Incbutton = document.getElementById("income")



Expbutton.onclick = (e) =>
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

Incbutton.onclick = (i) =>
{
    i.preventDefault()
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
          return response.json();
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
              return response.json();
            } else {
              throw new Error("NETWORK RESPONSE ERROR");
            }
          })
        }




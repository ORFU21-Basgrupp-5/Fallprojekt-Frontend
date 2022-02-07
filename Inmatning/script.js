
let Exp = document.getElementById("Utgifter")
let Inc = document.getElementById("Inkomster")
let Expbutton = document.getElementById("expense")
let Incbutton = document.getElementById("income")



Expbutton.onclick = (e) =>
{
    e.preventDefault()
    console.log("Du lade till en utgift")
let expinputs = {
     Expdate: Exp.Date.value,
     Expsaldo: Exp.Saldo.value,
     Expkonto:  Exp.Konto.value,
     Expdescription: Exp.Description.value,
     CategoryExpense: Exp.CategoryExp.value

}

    fetchExp(expinputs)



}

Incbutton.onclick = (i) =>
{
    i.preventDefault()
    console.log("Du lade till en inkomst")

    let incinputs = {
        Incsaldo: Inc.Saldo.value,
        Inckonto:Inc.Konto.value,
        Incdescription: Inc.Description.value,
        Incdate: Inc.Date.value,
        CategoryIncome: Inc.CategoryInc.value
        }
        fetchInc(incinputs)
}



async function fetchExp(expinputs){  
    const AddExp = await fetch('https://localhost:7151/Expenses/AddExpense?'+'saldo='+expinputs.Expsaldo+'&AccountId='+expinputs.Expkonto+'&description='+expinputs.Expdescription+'&date='+expinputs.Expdate+'&category='+expinputs.CategoryExpense, {
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
        const AddInc = await fetch('https://localhost:7151/Income/AddIncome?'+'saldo='+incinputs.Incsaldo+'&AccountId='+incinputs.Inckonto+'&description='+incinputs.Incdescription+'&date='+incinputs.Incdate+'&category='+incinputs.CategoryIncome, {
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





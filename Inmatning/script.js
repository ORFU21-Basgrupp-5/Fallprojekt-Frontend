
function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }

  // Return null if not found
  return null;
}

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
    const AddExp = await fetch('http://localhost:7151/Expenses/AddExpense?'+'saldo='+expinputs.Expsaldo+'&AccountId='+expinputs.Expkonto+'&description='+expinputs.Expdescription+'&date='+expinputs.Expdate+'&category='+expinputs.CategoryExpense, {
        method: "PUT", 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getCookie('token'),
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
        const AddInc = await fetch('http://localhost:7151/Income/AddIncome?'+'saldo='+incinputs.Incsaldo+'&AccountId='+incinputs.Inckonto+'&description='+incinputs.Incdescription+'&date='+incinputs.Incdate+'&category='+incinputs.CategoryIncome, {
            method: "PUT", 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getCookie('token')
            }})
          .then((response) => {
            if (response.ok) {
              return true;
            } else {
              throw new Error("NETWORK RESPONSE ERROR");
            }
          })
        }





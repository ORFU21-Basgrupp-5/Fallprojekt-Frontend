
let Exp = document.getElementById("utgifter")
let Inc = document.getElementById("Inkomster")
let Expbutton = document.getElementById("expense")
let Incbutton = document.getElementById("income")

// const Expense = (C)=>
// {
//     console.log("Du lade till en utgift")
// }
// const Income = (C)=>
// {
//     console.log("Du lade till en inkomst")
// }

Expbutton.onclick = (e) =>
{
    e.preventDefault()
    console.log("Du lade till en utgift")
}

Incbutton.onclick = (i) =>
{
    i.preventDefault()
    console.log("Du lade till en inkomst")
    
}


// }
// Expense()
// Income()
// // debugger
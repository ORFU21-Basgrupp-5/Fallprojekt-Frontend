let ListExp = document.getElementById("ListaUtgifter")

let data = ['Mat', 'Nöje', 'Hyra', 'Bilutgifter' ];
  
let list = document.getElementById("ListaUtgifter");
let DivWithExpenses = document.getElementById("DivWithExpenses")

ListExp.onclick = (e) =>
{
data.forEach((item)=>{
  let li = document.createElement("li");
  li.innerText = item;
  DivWithExpenses.appendChild(li);
  ListExp.remove()
})
}
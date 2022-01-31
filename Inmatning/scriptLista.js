let ListExp = document.getElementById("Lista Utgifter")

let data = ['Cigaretter', 'Spel', 'Alkohol', 'mat' ];
  
let list = document.getElementById("Lista Utgifter");

ListExp.onclick = (e) =>
{
data.forEach((item)=>{
  let li = document.createElement("li");
  li.innerText = item;
  list.appendChild(li);
})
}
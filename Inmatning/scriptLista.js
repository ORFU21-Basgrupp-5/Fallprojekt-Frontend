let ListExp = document.getElementById("Lista Utgifter")

let data = ['Mat', 'Nöje', 'Hyra', 'Bilutgifter' ];
  
let list = document.getElementById("Lista Utgifter");

ListExp.onclick = (e) =>
{
data.forEach((item)=>{
  let li = document.createElement("li");
  li.innerText = item;
  list.appendChild(li);
})
}
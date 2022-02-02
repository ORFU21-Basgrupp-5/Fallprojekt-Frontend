let ListExp = document.getElementById("ListaUtgifter")

ListExp.onclick = (e) =>
{
  let utgifter = [];
  fetch("https://localhost:7151/ListExpenses", {
    method: "GET", 
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
  .then(data => {
    console.log(data);
    utgifter = data;
    upgiftsLista(utgifter)
  })
  .catch((error) => console.error("FETCH ERROR:", error));
}

function upgiftsLista(data) {
  data.forEach((item)=>{

    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      DivWithExpenses.appendChild(li);
      ListExp.remove()
    }
  })
}
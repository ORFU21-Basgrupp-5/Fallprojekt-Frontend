export const render = (root) => {
    root.innerHTML = ''
    root.innerHTML = stringLista
    const DivWithExpenses = document.createElement('div')
    root.appendChild(DivWithExpenses)
    const text = document.createTextNode('Lista');
    root.appendChild(text);


var stringLista = '<h1>Lista Utgifter</h1><button id="ListaUtgifter" type="button" class="btn btn-primary btn-lg">Enter</button><div id="DivWithExpenses"></div>'


let ListExp = document.getElementById("buttonLista")

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
    }
  })
}
}
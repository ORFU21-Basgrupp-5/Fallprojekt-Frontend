
export const render = (root) => {
  root.innerHTML = ''
  var stringLista = '<h1>Lista Utgifter</h1><div id="DivWithExpenses"></div>'
  root.innerHTML = stringLista

  GetData();
}

function GetData(){
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
      upgiftsLista(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function upgiftsLista(data) {
  data.forEach((item)=>{
    let diven = document.getElementById("DivWithExpenses");
    for (let row in item) {
      let li = document.createElement("li");
      li.innerText = `${row}: ${item[row]}`;
      diven.appendChild(li);
    }
  })
}
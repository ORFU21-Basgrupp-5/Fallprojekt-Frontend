export const Render = (root) => {
  root.innerHTML = "";

  // let pageContent = document.getElementById("pageContent");
  // let header = document.getElementById("header");
  // let welcome = document.createElement("h1");
  // welcome.innerHTML = "Welcome";
  // pageContent.appendChild(welcome);

  var ActiveUser = sessionStorage.getItem("User");
  
  // let active = document.createElement("div");
  // active.setAttribute("id", "active_user");
  // pageContent.appendChild(active);
  // let newText = document
  //   .createElement("p")
  //   .appendChild(document.createTextNode(ActiveUser));
  // active.appendChild(newText);

  // const inmatningButton = document.createElement("button");
  // inmatningButton.setAttribute("id", "buttonInmatning");
  // inmatningButton.innerHTML = "Inmatning";

  // const listaEButton = document.createElement("button");
  // listaEButton.setAttribute("id", "buttonELista");
  // listaEButton.innerHTML = "ListaExpenses";

  // const listaIButton = document.createElement("button");
  // listaIButton.setAttribute("id", "buttonILista");
  // listaIButton.innerHTML = "ListaIncomes";

  // header.appendChild(inmatningButton);
  // header.appendChild(listaEButton);
  // header.appendChild(listaIButton);

  const html = `
    <div id="header">
      <button id="buttonInmatning">Inmatning</button>
      <button id="buttonELista">ListaExpenses</button>
      <button id="buttonILista">ListaIncomes</button>
    </div>
    <div id="pageContent">
      <h1>Welcome</h1>
      <div id="active_user">${ActiveUser}</div>
    </div>`

    root.innerHTML = html
};

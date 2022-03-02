export const Render = (root) => {
  root.innerHTML = "";

  let pageContent = document.getElementById("pageContent");
  let header = document.getElementById("header");
  let welcome = document.createElement("h1");
  welcome.innerHTML = "Welcome";
  pageContent.appendChild(welcome);

  var ActiveUser = sessionStorage.getItem("User");
  let active = document.createElement("div");
  active.setAttribute("id", "active_user");
  pageContent.appendChild(active);
  let newText = document
    .createElement("p")
    .appendChild(document.createTextNode(ActiveUser));
  active.appendChild(newText);

  const inmatningButton = document.createElement("button");
  inmatningButton.setAttribute("id", "buttonInmatning");
  inmatningButton.innerHTML = "Inmatning";

  const listaEButton = document.createElement("button");
  listaButton.setAttribute("id", "buttonELista");
  listaButton.innerHTML = "ListaExpenses";

  const listaIButton = document.createElement("button");
  listaButton.setAttribute("id", "buttonILista");
  listaButton.innerHTML = "ListaIncomes";

  header.appendChild(inmatningButton);
  header.appendChild(listaEButton);
  header.appendChild(listaIButton);
};

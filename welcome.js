var ActiveUser = sessionStorage.getItem("User");

let errorPassContainer = document.getElementById("active_user");
            let newText = document.createElement("p").appendChild(document.createTextNode(ActiveUser));
            errorPassContainer.appendChild(newText);

export const Render = (root) => {
    root.innerHTML = "";

    let pageContent = document.getElementById("pageContent")
    let header = document.getElementById("header");
    let welcome = document.createElement("h1")
    welcome.innerHTML = "Welcome";
    pageContent.appendChild(welcome);

    let active = document.createElement("div");
    active.setAttribute("id", "active_user");
    pageContent.appendChild(active);

    const inmatningButton = document.createElement("button");
    inmatningButton.setAttribute("id", buttonInmatning);
    inmatningButton.innerHTML = "Inmatning";

    const listaButton = document.createElement("button");
    listaButton.setAttribute("id", buttonLista);
    listaButton.innerHTML = "Inmatning";

    header.appendChild(inmatningButton);
    header.appendChild(listaButton);
}
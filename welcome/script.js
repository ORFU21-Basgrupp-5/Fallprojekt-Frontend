var ActiveUser = sessionStorage.getItem("User");

let errorPassContainer = document.getElementById("active_user");
            let newText = document.createElement("p").appendChild(document.createTextNode(ActiveUser));
            errorPassContainer.appendChild(newText);

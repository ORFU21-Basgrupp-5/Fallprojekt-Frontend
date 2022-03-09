import { getCookie } from "./cookie.js";
export const render = (root) => {
  root.innerHTML = "";

  const text = document.createTextNode("Reg");
  const divreg = document.createElement("div");
  divreg.setAttribute("id", "reg");

  const h1div = document.createElement("h1");
  const h1text = document.createTextNode("Skapa ett konto");

  const anchorLink = document.createElement("a");
  anchorLink.href = "/";
  const anchorText = document.createTextNode("Logga in här");
  anchorLink.appendChild(anchorText);

  const para = document.createElement("p");
  const paratext = document.createTextNode("Har du redan ett konto?");

  h1div.appendChild(h1text);
  divreg.appendChild(h1div);
  para.appendChild(paratext);
  para.appendChild(anchorLink);

  root.appendChild(divreg);
  root.appendChild(para);

  const form = document.createElement("form");
  form.setAttribute("id", "reg_form");

  const hiddenmessege = document.createElement("div");
  hiddenmessege.setAttribute("id", "hidden-message");

  const divuname = document.createElement("div");
  divuname.setAttribute("id", "uname");
  const labeluname = document.createElement("label");
  labeluname.setAttribute("for", "username");
  const unametext = document.createTextNode("Användarnamn");
  const inputuname = document.createElement("input");
  inputuname.setAttribute("type", "text");
  inputuname.setAttribute("name", "username");
  inputuname.setAttribute("placeholder", "Välj ett användarnamn");

  form.appendChild(hiddenmessege);
  form.appendChild(divuname);
  divuname.appendChild(labeluname);
  labeluname.appendChild(unametext);
  divuname.appendChild(inputuname);
  form.appendChild(divuname);

  const divemail = document.createElement("div");
  divemail.setAttribute("id", "email");
  const labelemail = document.createElement("label");
  labelemail.setAttribute("for", "email");
  const emailtext = document.createTextNode("Email:");
  const inputemail = document.createElement("input");
  inputemail.setAttribute("type", "text");
  inputemail.setAttribute("name", "email");
  inputemail.setAttribute("placeholder", "Fyll i din epost");

  form.appendChild(divemail);
  form.appendChild(labelemail);
  labelemail.appendChild(emailtext);
  form.appendChild(inputemail);

  const divpassword = document.createElement("div");
  divpassword.setAttribute("id", "pswrd");
  const labelpassword = document.createElement("label");
  labelpassword.setAttribute("for", "password");
  const passwordtext = document.createTextNode("Lösenord: ");
  const inputpassword = document.createElement("input");
  inputpassword.setAttribute("type", "text");
  inputpassword.setAttribute("name", "password");
  inputpassword.setAttribute("placeholder", "Välj ett lösenord");

  form.appendChild(divpassword);
  form.appendChild(labelpassword);
  labelpassword.appendChild(passwordtext);
  form.appendChild(inputpassword);

  const divpasswordvalid = document.createElement("div");
  divpasswordvalid.setAttribute("id", "pswrdvalid");
  const labelpasswordvalid = document.createElement("label");
  labelpasswordvalid.setAttribute("for", "password2");
  const passwordvalidtext = document.createTextNode("Bekräfta lösenord: ");
  const inputpasswordvalid = document.createElement("input");
  inputpasswordvalid.setAttribute("type", "text");
  inputpasswordvalid.setAttribute("name", "password2");
  inputpasswordvalid.setAttribute("placeholder", "Bekräfta lösenord");

  form.appendChild(divpasswordvalid);
  form.appendChild(labelpasswordvalid);
  labelpasswordvalid.appendChild(passwordvalidtext);
  form.appendChild(inputpasswordvalid);

  const buttondiv = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.innerHTML = "Submit";

  buttondiv.appendChild(button);
  form.appendChild(buttondiv);

  root.appendChild(form);

  form.onsubmit = (e) => {
    e.preventDefault();
    const userRegister = [
      document.forms["reg_form"]["username"].value,
      document.forms["reg_form"]["email"].value,
      document.forms["reg_form"]["password"].value,
      document.forms["reg_form"]["password2"].value,
    ];

    const usernamevalidate = userRegister.every((x) => x.value != "");
    if (usernamevalidate) {
      if (userRegister[2].value != userRegister[3].value) {
        let errorPassContainer = document.getElementById("hidden-message");
        let newText = document
          .createElement("p")
          .appendChild(document.createTextNode("Lösenorden matchar inte!"));
        errorPassContainer.appendChild(newText);
      } else if (CheckPassword(userRegister[2]) === false) {
        let errorPassContainer = document.getElementById("hidden-message");
        let newText = document
          .createElement("p")
          .appendChild(
            document.createTextNode(
              "Ditt lösenord måste ha minst 12 tecken,en gemen, en storbokstav, en siffra och ett special tecken"
            )
          );
        errorPassContainer.appendChild(newText);
      } else {
        const name = userRegister[0];
        const email = userRegister[1];
        const password = userRegister[2];

        const userDTO = {
          userName: name,
          password: password,
          email: email,
        };

        FetchReg(userDTO);
      }
    } else {
      let errorPassContainer = document.getElementById("hidden-message");
      let newText = document
        .createElement("p")
        .appendChild(document.createTextNode("Du måste fylla i alla fälten!"));
      errorPassContainer.appendChild(newText);
    }
  };

  async function FetchReg(newUser) {
    let response = await fetch("https://localhost:7151/User/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      console.log("something went wrong");
    } else {
      var activeUser = newUser.userName;
      sessionStorage.setItem("User", activeUser);
      alert("Du är nu registrerad!");
      window.location.assign("/welcome/");
    }
  }

  function CheckPassword(password) {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,50}$/;
    if (password.match(paswd)) {
      return true;
    } else {
      return false;
    }
  }
};

//Orginalsträng till html
// const stringReg = '<div id="reg"><h1>Skapa ett konto</h1><p>Har du redan ett konto? <a href="/">Logga in här</a></p><form id="reg_form"><div id="hidden-message"></div><div id="uname"><label for="username">Användarnamn </label><input type="text" name="username" placeholder="Välj ett användarnamn"></div><div id="email"><label for="email">Email: </label><input type="text" name="email" placeholder="Fyll i din epost"></div><div id="pswrd"><label for="password">Lösenord: </label><input type="text" name="password" placeholder="Välj ett lösenord"></div><div id="pswrdvalid"><label for="password2">Bekräfta lösenord: </label><input type="text" name="password2" placeholder="Bekräfta lösenord"></div><div id="btn"><input type="submit"></div></form></div>'

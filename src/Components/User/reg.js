import { useState, useEffect, useContext } from 'react'
import { GetCookie } from "../cookie";
import { DefaultRender } from "../errorHandler.js";

const RegForm = () => {
    
  const [formData, setFormData] = useState({
    username: "",
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  let handleSubmit = (event) => {
    event.preventDefault()
  };

  const FetchReg = async (e) => {
    e.preventDefault();
    const post = formData;
    try {
      const fetchUser = await API_Service.PostService('User/register', post); 
      if (fetchUser !== false){
        ValidateUser(fetchUser);
      }
    } catch (e) {
      DefaultRender("Username or password incorrect")
    }
  }
  
  
  function ValidateUser()
  {
    const usernamevalidate = userRegister.every((x) => x != "");
        if (usernamevalidate) {
          if (userRegister[2] != userRegister[3]) {
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
              
            
            // form.onsubmit = (e) => {
              //     e.preventDefault();
              //     const userRegister = [
                //     document.forms["reg_form"]["username"].value,
                //     document.forms["reg_form"]["email"].value,
                //     document.forms["reg_form"]["password"].value,
                //     document.forms["reg_form"]["password2"].value,
                // ];
                
                // async function FetchReg(newUser) {
                //     let response = await fetch("http://localhost:7151/User/register", {
                //         method: "post",
                //         headers: {
                //             "Content-Type": "application/json",
                //             Authorization: "Bearer " + GetCookie("token"),
                //         },
                //         body: JSON.stringify(newUser),
                //     });
                //     let textreponse = await response.text();
                //     if (!response.ok) {
                //         DefaultRender(`${text.error}`);
                //     } else {
                //         var activeUser = newUser.userName;
                //         sessionStorage.setItem("User", activeUser);
                //         alert("Du är nu registrerad!");
                //         Welcomepage(pageContent);
                //         let Header = new Header();;
                //     }
                // }

    
    function CheckPassword(password) {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,50}$/;
        if (password.match(paswd)) {
            return true;
        } else {
            return false;
        }
    }

  
    return (           
        <div id="pageContent">
          <div id="reg">
            <h1>Skapa ett konto</h1>
          </div>
          <p>Har du redan ett konto?<a href="/">Logga in här</a> </p>
          <form id="reg_form"><div id="hidden-message"/>
            
            <div id="uname">
              <label for="username">Användarnamn</label>
              <input type="text" name="username" placeholder="Välj ett användarnamn"/>
            </div>
            <div id="email">
              <label for="email">Email:</label>
              <input type="text" name="email" placeholder="Fyll i din epost"/>
            </div>
            <div id="pswrd">
              <label for="password">Lösenord: </label>
              <input type="text" name="password" placeholder="Välj ett lösenord"/>
            </div>
            <div id="pswrdvalid">
              <label for="password2">Bekräfta lösenord:</label>
              <input type="text" name="password2" placeholder="Bekräfta lösenord"/>
              </div>
            <div>
              <button type="submit">Submit</button>
            </div>
            <div id="errorDiv"></div>
          </form>
        </div>     
    )      
}
export default RegForm

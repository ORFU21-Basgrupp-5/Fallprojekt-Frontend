import { useState, useEffect, useContext } from 'react'
import { GetCookie } from "../Services/cookie";
import { DefaultRender } from "../Services/errorHandler.js";
import API_Service from '../../API/API_Service';

const Register = () => {
    
    const [formData, setFormData] = useState({
      username: "",
      email: '',
      password: '',
      confirmpassword: ''
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
      const usernamevalidate = formData.every((x) => x != "");
          if (usernamevalidate) {
            if (formData[2] != formData[3]) {
              let errorPassContainer = document.getElementById("hidden-message");
              let newText = document
              .createElement("p")
              .appendChild(document.createTextNode("Lösenorden matchar inte!"));
              errorPassContainer.appendChild(newText);
            } else if (CheckPassword(formData[2]) === false) {
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
                      const name = formData[0];
                      const email = formData[1];
                      const password = formData[2];
                      
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
            <p>Har du redan ett konto?<a href="/login">Logga in här</a> </p>
            <form id="reg_form"><div id="hidden-message"/>
              
              <div id="uname">
                <label for="username">Användarnamn</label>
                <input type="text" value={formData.username} name="username" placeholder="Välj ett användarnamn"/>
              </div>
              <div id="email">
                <label for="email">Email:</label>
                <input type="text" value={formData.email} name="email" placeholder="Fyll i din epost"/>
              </div>
              <div id="pswrd">
                <label for="password">Lösenord: </label>
                <input type="text" value={formData.password} name="password" placeholder="Välj ett lösenord"/>
              </div>
              <div id="pswrdvalid">
                <label for="password2">Bekräfta lösenord:</label>
                <input type="text" value={formData.confirmpassword} onchange={handleChange} name="password2" placeholder="Bekräfta lösenord"/>
                </div>
              <div>
                <button type="submit" onSubmit = {handleSubmit}>Submit</button>
              </div>
              <div id="errorDiv"></div>
            </form>
          </div>     
      )      
  }
  export default Register
  
import { useState } from 'react'
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [errorMessage, setMessage] = useState("");
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
      if (fetchUser !== false) {
        ValidateUser(fetchUser);
      }
    } catch (e) {
      setMessage("Username or password incorrect")
    }
  }


  function ValidateUser() {
    const usernamevalidate = formData.every((x) => x !== "");
    if (usernamevalidate) {
      if (formData[2] !== formData[3]) {
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
    <div className='flex justify-center mt-20'>
      <form className="form-main">
        <div id="hidden-message" />

        <div id="uname" className="mb-6">
          <label className="label-main" htmlFor="username">Användarnamn</label>
          <input className="input-main" type="text" value={formData.username} name="username" onChange={(e) => handleChange(e)} placeholder="Välj ett användarnamn" />
        </div>
        <div id="email" className="mb-6">
          <label className="label-main" htmlFor="email">Email:</label>
          <input className="input-main" type="text" value={formData.email} name="email" onChange={(e) => handleChange(e)} placeholder="Fyll i din epost" />
        </div>
        <div id="pswrd" className="mb-6">
          <label className="label-main" htmlFor="password">Lösenord: </label>
          <input className="input-main" type="password" value={formData.password} name="password" onChange={(e) => handleChange(e)} placeholder="Välj ett lösenord" />
        </div>
        <div id="pswrdvalid" className="mb-6">
          <label className="label-main" htmlFor="password2">Bekräfta lösenord:</label>
          <input className="input-main" type="password" value={formData.confirmpassword} onChange={(e) => handleChange(e)} name="confirmpassword" placeholder="Bekräfta lösenord" />
        </div>
        <div>
          <input className="btn-main" type="submit" onSubmit={handleSubmit} />
        </div>
        
        <DefaultRender errorMessage={errorMessage} />
      </form>
      <div className='flex justify-center'>
      <p className="block text-gray-700 text-sm font-bold mb-2 ">
        Har du redan ett konto?
          <NavLink to='/login' id='reglink'>
            Logga in här
          </NavLink>
        </p>
      </div>
    </div>
  )
}
export default Register

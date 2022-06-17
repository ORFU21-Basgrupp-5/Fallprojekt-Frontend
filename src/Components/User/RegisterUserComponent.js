import { useState } from 'react'
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service';

const Register = () => {
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
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
      setMessage("Username or password incorrect");
      setCounter(counter + 1);
    }
  }


  function ValidateUser() {
    const usernamevalidate = formData.every((x) => x !== "");
    if (usernamevalidate) {
      if (formData[2] !== formData[3]) {
        setMessage("Lösenorden matchar inte!");
        setCounter(counter + 1);
      } else if (CheckPassword(formData[2]) === false) {
        setMessage("Ditt lösenord måste ha minst 12 tecken,en gemen, en storbokstav, en siffra och ett special tecken");
        setCounter(counter + 1);

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
      setMessage("Du måste fylla i alla fälten!");
      setCounter(counter + 1);

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
      <form id="reg_form">

        <div id="uname">
          <label for="username">Användarnamn</label>
          <input type="text" value={formData.username} name="username" onChange={(e) => handleChange(e)} placeholder="Välj ett användarnamn" />
        </div>
        <div id="email">
          <label for="email">Email:</label>
          <input type="text" value={formData.email} name="email" onChange={(e) => handleChange(e)} placeholder="Fyll i din epost" />
        </div>
        <div id="pswrd">
          <label for="password">Lösenord: </label>
          <input type="password" value={formData.password} name="password" onChange={(e) => handleChange(e)} placeholder="Välj ett lösenord" />
        </div>
        <div id="pswrdvalid">
          <label for="password2">Bekräfta lösenord:</label>
          <input type="password" value={formData.confirmpassword} onChange={(e) => handleChange(e)} name="confirmpassword" placeholder="Bekräfta lösenord" />
        </div>
        <div>
          <input type="submit" onSubmit={handleSubmit} />
        </div>
        <DefaultRender errorMessage={errorMessage} counter={counter} />
      </form>
    </div>
  )
}
export default Register

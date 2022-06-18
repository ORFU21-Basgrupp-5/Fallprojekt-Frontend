import { useState } from 'react'
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service';
import { useNavigate, NavLink } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: '',
    password: '',
    confirmpassword: ''
  })

  const handleChange = (e) => {
    setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}));
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    ValidateUser();
  };

  const FetchReg = async () => {
    try {
      let postData =  {};
      for (const [key, value] of Object.entries(formData)) {
        postData[key] = value;
      }
      delete postData['confirmpassword'];
      const res = await API_Service.PostService('User/register', postData);
      if (res != false) {
        setMessage("Registrerad. Går till login...");
        setTimeout(() =>{
          navigate('/login');
        }, 5000);
      }
    } catch (e) {
      setMessage("Username or password incorrect");
      setCounter(counter + 1);
    }
  }


  const ValidateUser = () => {
    const usernamevalidate = Object.values(formData).every((x) => x !== "");
    if (usernamevalidate) {
      if (formData.password !== formData.confirmpassword) {
        setMessage("Lösenorden matchar inte!");
        setCounter(counter + 1);
      } else if (CheckPassword(formData.password) === false) {
        setMessage("Ditt lösenord måste ha minst 12 tecken, en gemen, en storbokstav, en siffra och ett special tecken");
        setCounter(counter + 1);
      } else {
        FetchReg();
      }
    } else {
      setMessage("Du måste fylla i alla fälten!");
      setCounter(counter + 1);
    }
  };

  const CheckPassword = (password) => {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,50}$/;
    if (password.match(paswd)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className='container'>
      <div>
        <form className="form-main">
          <div id="hidden-message" />
          <div className="input-wrapper">
            <label className="label-main" htmlFor="username">Användarnamn</label>
            <input required className="input-main" type="text" value={formData.username} name="username" onChange={(e) => handleChange(e)} placeholder="Välj ett användarnamn" />
          </div>
          <div className="input-wrapper">
            <label className="label-main" htmlFor="email">Email</label>
            <input required className="input-main" type="text" value={formData.email} name="email" onChange={(e) => handleChange(e)} placeholder="Fyll i din epost" />
          </div>
          <div className="input-wrapper">
            <label className="label-main" htmlFor="password">Lösenord </label>
            <input required className="input-main" type="password" value={formData.password} name="password" onChange={(e) => handleChange(e)} placeholder="Välj ett lösenord" />
          </div>
          <div className="input-wrapper">
            <label 
            className="label-main" htmlFor="password2">Bekräfta lösenord</label>
            <input required className="input-main" type="password" value={formData.confirmpassword} onChange={(e) => handleChange(e)} name="confirmpassword" placeholder="Bekräfta lösenord" />
          </div>
          <div>
            <input className="btn-main" type="submit" onClick={handleSubmit}/>
          </div>
          
          <DefaultRender errorMessage={errorMessage} counter={counter}/>
        </form>
        <div className='label-linkwrap'>
          <p className="label-main">
            Har du redan ett konto? {' '}
            <NavLink className="menu-textlink" to='/login' id='reglink'>
              Logga in här
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Register

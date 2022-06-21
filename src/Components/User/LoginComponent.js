import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DefaultRender } from '../Services/messageHandler.js';
import API_Service from '../../API/API_Service.js';
import { useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Services/AuthProvider.js';
import { FaSpinner } from 'react-icons/fa';
//first we create a "view" that is the html code we want to display


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(0);
  const { loginStatus, setLoginStatus } = useAuth();
  const { state } = useLocation();
  const previousPath = state?.from ? state.from : '/';
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    userName: '',
    password: '',
  });
  const moveToWelcome = () => {
    navigate('/welcome');
  };

  const handleFormChange = (e) => {
    setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let handleSubmit = (event) => {
    event.preventDefault();
  };
  const tryLogin = async (e) => {
    e.preventDefault();
    const post = inputFields;
    try {
      setLoading(true);
      const fetchresult = await API_Service.PostService('User/login', post);
      if (fetchresult !== false) {
        CreateLoginToken(fetchresult);
        setLoginStatus(true);
        moveToWelcome();
      }
      else {
        setMessage('Username or password is incorrect.');
        setCounter(counter + 1);
        setTime(4000);
      }
    } catch (e) {
      setMessage('Could not log in, check your internet connection');
      setCounter(counter + 1);
      setTime(4000);
    }
    finally {
      setLoading(false)
    }

    function CreateLoginToken(data) {
      let token = data.token;
      let user = data.user;
      let expires = new Date(Date.now() + 86400 * 1000).toUTCString();

      document.cookie = `token=${token};user=${user};expires=${expires + 86400};path=/;`;
    }
  };
  return loginStatus ? (
    <Navigate to={previousPath} />
  ) : (
    <div className='container'>
      <div id='login'>

        <form id='form1' className="form-main" onSubmit={handleSubmit}>
          <div id='uname' className='input-wrapper'>
            <label className="label-main" htmlFor='username'>Användarnamn </label>

            <input
              className="input-main"
              type='text'
              name='userName'
              placeholder='Fyll i ditt användarnamn'
              value={inputFields.userName}
              onChange={(event) => handleFormChange(event)}
            />
          </div>

          <div id='pswrd' className="input-wrapper">
            <label className="label-main" htmlFor='password'>Lösenord </label>

            <input
              className="input-main"
              type='password'
              name='password'
              placeholder='Fyll i ditt lösenord'
              value={inputFields.password}
              onChange={(event) => handleFormChange(event)}
            />
          </div>

          <div id='recover' className="flex items-center justify-between">
            <NavLink to='/recover' id='recover-btn' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Glömt lösenordet?
            </NavLink>

            <button type='submit' name='login' className="btn-main" onClick={tryLogin}>
              Login
              {loading &&
                <span className='animate-spin h-5 w-5 ml-3 inline-block text-center'>
                  <FaSpinner />
                </span>
              }
            </button>

          </div>

          <DefaultRender errorMessage={errorMessage} counter={counter} time={time} />
        </form>
        <div className='label-linkwrap'>
          <p className="label-main">
            Saknar du ett konto? {' '}
            <NavLink className="menu-textlink" to='/registeruser' id='reglink'>
              Skapa konto
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

//we export this page so that app.js can call on it when the route is correct aka /login
export default Login;

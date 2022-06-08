import './CSS/App.css';
import RecoverEmail from './Components/User/recoveremail'
import Inmatning from './Components/Budget/inmatning'
import ChangePassword from './Components/User/changepassword'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegForm from './Components/User/reg'


function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
      <Route path="/inmatning" element={<Inmatning/>} />
      <Route path="/recoveremail" element={<RecoverEmail/>} />
      <Route path="/RegForm" element={<RegForm/>} />
      <Route path="/ChangePassword" element={<ChangePassword/>} />


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

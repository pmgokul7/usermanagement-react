

import { Route, Routes } from 'react-router-dom';
import Adduser from './pages/AddUser.jsx';
import AdminHome from './pages/AdminHome.jsx';
import Adminlogin from './pages/AdminLogin.jsx';
import Edituser from './pages/EditUser.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/register.jsx';
import UserProfile from './pages/UserProfile.jsx';
function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route  path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/adminlogin' element={< Adminlogin/>}/>
        <Route path='/' element={< Home/>}/>
        <Route path='/profile' element={< UserProfile/>}/>
        <Route path='/admin' element={< AdminHome/>}/>
        <Route path="/admin/adduser" element={<Adduser/>}/>
        <Route path='/edituser' element={<Edituser/>}/>
   
   </Routes>
   
      
    </div>
  );
}

export default App;

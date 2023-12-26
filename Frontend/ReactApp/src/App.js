
import './App.css';
import CreateGroup from './components/CreateGroup';
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import UpdateGroup from './components/UpdateGroup';
import UserDashBoard from './components/UserDashBoard';
import AddEmployee from './components/AddEmployee';
import Info from './components/Info';


function App() {
  
  
  return (
    <BrowserRouter>
   
    <Routes>
      
        <Route  path='/' element={<Login  />}/>
        <Route  path='admin/dashboard' element={<DashBoard  />}/>
        <Route  path='user/dashboard' element={<UserDashBoard  />}/>
        <Route  path='admin/dashboard/create' element={<CreateGroup />}/>
        <Route  path='admin/dashboard/add/:id' element={<AddEmployee />}/>
        <Route  path='admin/dashboard/update/:id' element={<UpdateGroup  />}/>
        <Route  path='admin/dashboard/info' element={<Info  />}/>
        <Route  path='user/dashboard/info' element={<Info  />}/>
        

      
    </Routes>
    
  
    </BrowserRouter>
   
    
  );
}

export default App;

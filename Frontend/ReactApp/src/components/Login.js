import React, {  useState } from 'react'
import EmployeeService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import {ToastContainer,toast} from "react-toastify"



const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] =useState('');
    const[employee,setEmployee]=useState('');
    const[error,setError] =useState('');
    const[role,setRole] = useState(''); 


    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async(event)=>{
        event.preventDefault();

        try{
            const employee = await EmployeeService.login(username,password);
            if (employee) {
              setEmployee(employee);
              setRole(employee.role)
              handleNavigate(employee.role); 
              Cookies.set('employee',JSON.stringify(employee));
              toast.success('Welcome ',username , {
                position: toast.POSITION.TOP_CENTER
              });

            } else {
              toast.error("invalid credentials!!", {
                position: toast.POSITION.TOP_CENTER
              });
              setRole(null);
            }
            
        }catch(error){
            setError(error);
            setRole(null);
        }
    }

    console.log(role);
    console.log(employee);

   const handleNavigate=(role)=>{
   if(role==='admin'){
    navigate('admin/dashboard')
   }else{
    navigate('user/dashboard')
   }

    
   }

  return (



<div className="container">

<ToastContainer/>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="my-5">

            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
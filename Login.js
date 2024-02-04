import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
const URL = "http://localhost:9090/login";
function Login() {
    const [formData, setFormData] = useState({
    
      email: '',
      
      password: '',
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
     try {
      
    
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          
        });
       
    
  
        if (response.ok) {
          setFormData({email:"",password:""})
          alert("login successful")
          navigate("/logintodo");
          
        
        }
       
          
         else {
          alert("user does not exist !!");
          console.log(Error);
          
        }
       
      } catch (error) {
      console.log("internal server error");
      }

        
      
    };
  
    return (
      <div className='mainlogin'>
        <h1 className='loginh'>Login form</h1>
        <form ><div className='loginform'>
          <input type="email" className='loginemail' name="email" onChange={handleChange} value={formData.email} placeholder="Enter email" />
          <input type="password" className='loginpassword' name="password" onChange={handleChange} value={formData.password} placeholder="Enter password" />
          </div>
          <button type="submit" className='loginsubmit' onClick={handleSubmit}>Submit</button>
          
        </form>
      </div>
    );
  }
  export default Login;
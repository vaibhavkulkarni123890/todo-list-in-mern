import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




function Data() {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      phone: '',
      password: '',
    });
  
    const navigate = useNavigate(); // Initialize useNavigate
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:9090/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Registration successful.");
  
          // Navigate to Todo component
          navigate("/");
  
          // You can also pass state to the Todo component if needed:
          // navigate("/todo", { someData: "some value" });
        }
       
          
         else {
          alert('User already exists!');
        }


        
      } catch (error) {
        alert('Error:', error.message);
      }
    };
  
    return (
      <div className='signinmain'>
        <h1 className='signuppara'>Signup Form</h1>
        <form onSubmit={handleSubmit}><div className='signupform'>
          <input type="text" className='signupname' name="username" onChange={handleChange} value={formData.username} placeholder="Enter name" />
          <input type="email" className='signupemail'  name="email" onChange={handleChange} value={formData.email} placeholder="Enter email" />
          <input type="number" className='signupnumber' name="phone" onChange={handleChange} value={formData.phone} placeholder="Enter phone number" />
          <input type="password"className='signuppassword'  name="password" onChange={handleChange} value={formData.password} placeholder="Enter password" />
          </div><button type="submit" className='signupbtn'>Submit</button>
        </form>
      </div>
    );
  }
  export default Data;
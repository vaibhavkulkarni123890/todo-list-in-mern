
import { useState,useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App1.css';


 function Todologin(){
   
  const [todos, setTodos] = useState([]);
 const [todo, setTodo] = useState('');
    const [date, setDate] = useState('');
  const [time, setTime] = useState('');



const navigate = useNavigate();
const URL="http://localhost:9090/foundTodos";



const remove = async (id) => {
  try {
    await axios.delete(`http://localhost:9090/deltodos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

  function handleAddTodo() {


    
    const savetodos = async ()=>{
      try {
        const response= await fetch("http://localhost:9090/todo",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({todo,date,time}),
        })
        
        if(response.ok){
          
         console.log("Todos saved");
        }else{
  alert("failed to store todos please try again")
        }
      } catch (error) {
        console.log("internal server error");
      }
      }
      savetodos();
    if (todo && date && time) {
              setTodos([...todos, { todo, date,time }]);
     setTodo('');
     setDate('');
     setTime('');


  }}
 
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(URL,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           
          }}); 
        const data = await response.json(todos);
        
        if (response.ok) {
          setTodos(data.Find);
        } else {
          console.log("error while fetching todos");
        }
      } catch (error) {
       console.log("Internal server error");
      }
    };

    fetchTodos();
  }, [todos]);

  function renderTodos() {


 
    return todos?.map((item)  => (<div  className='maindiv'>
     <input type="hidden" name="todoId" value={todo.id} />
      <div className='main' key={item._id}><div className='one'>
        <p className='todo'>Your work: "{item.todo}"</p>
        <p className='date'>Date: "{item.date}" at : "{item.time}"</p>
        </div><div className='btn1'> <button className='btn' onClick={()=>remove(item._id)}>remove</button></div>
      </div>
      </div>
    )
    );
  

  }
  function handlesubmit(){
   navigate('/')
   }


  return (
    <div className='div'>
   <h1 className='todotext'>Welcome  Back  </h1>
      <form>
        <input
         className='form1'
          placeholder="Enter your Todos"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
       
        <input
          className='form2'
          placeholder="Enter date"
          type="date"
        onChange={(e) => setDate(e.target.value)}
          value={date}
        />
          <input
          className='form3'
          placeholder="Enter time"
          type="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />
     </form><div>
      <button className='add' onClick={handleAddTodo}>Add</button>
      </div>
     {renderTodos()}<div className='mainlogoutbtn'>
     <button type="submit" className='logoutbtn' onClick={handlesubmit}>Logout</button></div>
   </div>
  );
}

 

export default Todologin;
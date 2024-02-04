import './App.css';
import { useNavigate } from "react-router-dom";
function Main(){
    const navigate =useNavigate();
function handleclick(e){
e.preventDefault();
navigate("/login")
}
function handleclick1(e){
    e.preventDefault();
navigate("/register")
}

    return(
        <div className="maintodo"><div>
      <h1 className="listapp">Welcome to Todo list app</h1>
      <div className='mainbtn'>
        <p className='mainpara'>please SignIn if your Registration is successful</p>
      <button className="signin" onClick={handleclick}>SignIn</button>
      <h3 className='mainpara1'>New to Todo list </h3>
      <p className='mainpara2'>Sign UP first </p>
         <button className="signup" onClick={handleclick1}>SignUp</button>
         </div>
         </div>
        </div>
    )
}
export default Main;
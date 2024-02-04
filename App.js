import Data from "./Data";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./main";
import Login from "./Login.js";
import Todologin from "./logintodo.js"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Data />} />
        <Route path="/logintodo" element={<Todologin />} />
        <Route path="/" element={<Main />} />
        
      </Routes>
    </Router>
  );
}

export default App;


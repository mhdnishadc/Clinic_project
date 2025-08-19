import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/Bookappointment';
import Appointmentlist from './pages/Appointmentlist';




function App() {
const [isLoggedIn, setIsLoggedIn] =  useState(false);
 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
  
     <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/doctors" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/doctors" element={
            isLoggedIn ? <Doctors /> : <Navigate to="/" />
          }/>
           <Route path="/book/:doctorId" element={<BookAppointment />} />
            <Route path="/appointments" element={<Appointmentlist/>} />
      </Routes>
    </Router>
    
  );
}

export default App

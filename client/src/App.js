import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import AddMember from './pages/addMember';
import HealthData from './pages/memberhealthData';
import LandingPage from './pages/landingpage';
import Register from './pages/register';
import ProtectedRoute from './ProtectedRoute';

export default function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/addmember" element={<ProtectedRoute><AddMember/></ProtectedRoute>}/>
      <Route path="/memberhealthdata" element={<ProtectedRoute><HealthData/></ProtectedRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
   </Router>
  );
}

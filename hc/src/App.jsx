import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/login";
import Index from "./Pages/student/dashboard";
import Profile from "./Pages/student/profile";
import Complaints from "./Pages/student/complaints";

import './index.css'

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboards" element={<Index />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Complaints" element={<Complaints />} />


      </Routes>
    </Router>
  )
}

export default App

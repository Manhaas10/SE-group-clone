import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/login";
import Index from "./Pages/student/dashboard";
import Profile from "./Pages/student/profile";
import Complaints from "./Pages/student/complaints/complaints";
// import SkillSharingPage from "./Pages/student/skillsharing";
import LostAndFound from "./Pages/student/lostandfound/LandF";
import NewReport from "./Pages/student/lostandfound/newreport";
import LateEntryRequest from "./Pages/student/LateEntryRequest";
import FoodSharing from "./Pages/student/FoodSharing";
import NewFoodPost from "./Pages/student/NewFoodPost";
import Skill from "./Pages/student/skillsharing/skillsharing";

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
      {/* <Route path="/skill" element={<SkillSharingPage />} /> */}
      <Route path="/LandF" element={<LostAndFound />} />
      <Route path="/newr" element={<NewReport />} />  
      <Route path="/Late" element={<LateEntryRequest />} />  
      <Route path="/food" element={<FoodSharing />} />  
      <Route path="/skill" element={<Skill />} />
      <Route path="/nfp" element={<NewFoodPost />} />


      </Routes>
    </Router>
  )
}

export default App

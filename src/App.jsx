import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './i18n'; // ✅ THIS IS REQUIRED BEFORE App IS RENDERED


import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import SignUp from "./pages/user/SignUp";
import BusinessCards from "./pages/user/BusinessCard";
import PostCards from "./pages/user/PostCards";
import Flyers from "./pages/user/Flyers";
import SignIn from "./pages/user/Signin";
import ResetPassword from "./pages/user/ResetPassword";
import Stickers from "./pages/user/Stickers";
import BusinessCardDetails from "./pages/user/BusinessCardDetails";
import Stationery from "./pages/user/Stationery";
import PersonalizedGift from "./pages/user/PersonalizedGift";





import AdminHeader from "./pages/admin/components/AdminHeader";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DashboardContent from "./pages/admin/components/DashboardContent";
import AdminSidebar from "./pages/admin/components/AdminSidebar";
import Login from "./pages/admin/Login";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />  
        <Route path="/Signup" element={<SignUp/>} />
        <Route path="/businessCard" element={<BusinessCards/>} /> 
        <Route path="/postCards"  element={<PostCards/>}/>
        <Route path="/flyers" element={<Flyers/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/stickers" element={<Stickers/>}/>
        <Route path="/businesscardDetails" element={<BusinessCardDetails/>}/>
        <Route path="/stationery" element={<Stationery/>}/>
        <Route path="/personalized-gift" element={<PersonalizedGift/>}/>






        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/sidebar" element={<AdminSidebar/>}/>
        <Route path="/login" element={<Login/>}/>
        
        </Routes>
    </Router>
    
  );
}

export default App;

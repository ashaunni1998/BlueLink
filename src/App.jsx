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
import SuperBusinessCards from "./pages/user/SuperBusinessCards";
import TShirtPrinting from "./pages/user/TshirtPrinting";
import ButtonBadges from "./pages/user/ButtonBadges";
import PostcardDetails from "./pages/user/PostcardDetails";
import FlyerDetails from "./pages/user/FlyerDetails";
import GreetingCardDetails from "./pages/user/GreetingCardDetails";
import StickerDetails from "./pages/user/StickerDetails";
import TShirtPrintingDetail from "./pages/user/TshirtPrintingDetail";
import PersonalizedGiftDetails from "./pages/user/PersonalizedGiftDetails";
import ButtonBadgesDetail from "./pages/user/ButtonBadgesDetail";
import Checkout from "./pages/user/Checkout";



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
        <Route path="/superbusinessCard" element={<SuperBusinessCards/>}/>
        <Route path="/tshirtprinting" element={<TShirtPrinting/>}/>
        <Route path="/buttonbadges"  element={<ButtonBadges/>}/>
        <Route path="/postcarddetails" element={<PostcardDetails/>}/>
       <Route path="/flyerdetails" element={<FlyerDetails/>}/>
       <Route path="/greetingcardDetails" element={<GreetingCardDetails/>}/>
       <Route path="/stickerdetails" element={<StickerDetails/>}/>
       <Route path="/tshirtprintingdetail" element={<TShirtPrintingDetail/>}/>
       <Route path="/personalizedgiftDetails" element={<PersonalizedGiftDetails/>}/>
       <Route path="/buttonbadgesdetails" element={<ButtonBadgesDetail/>}/>
       <Route path="/checkout" element={<Checkout/>}/>



        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/sidebar" element={<AdminSidebar/>}/>
        <Route path="/login" element={<Login/>}/>
        
        </Routes>
    </Router>
    
  );
}

export default App;

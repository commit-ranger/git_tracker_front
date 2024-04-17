import { useState } from "react";
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Test_page from "./test";
import Repo_page from "./components/repo_page/repo_page"
import Homepage from "./components/homepage/homepage";
import Login_page from "./components/user_registration/login_page";
import New_user from "./components/user_registration/new_user";
import Profile from "./components/Profile/profile";
function App() {

  return (
    <>
      <h1>Git Tracker</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login_page" element={<Login_page />} />
        <Route path="/register" element={<New_user />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/repo/:repo_id" element={<Repo_page />} />
      </Routes>
      
    </>
  );
}

export default App;

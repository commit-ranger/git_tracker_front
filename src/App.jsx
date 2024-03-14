import { useState } from "react";
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Test_page from "./test";
import Repo_page from "./components/repo_page/repo_page"

function App() {

  return (
    <>
      <h1>Git Tracker</h1>
      <Routes>
        <Route path="/" element={<Repo_page />} />
        <Route path="/repo" element={<Repo_page />} />
      </Routes>
      
    </>
  );
}

export default App;

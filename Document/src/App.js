// Main App Router setup
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";

function App() {
  return (
    <div>
      <nav style={{ padding: 16, background: "#1976d2", color: "white" }}>
        <Link to="/" style={{ color: "white", marginRight: 16 }}>Home</Link>
        <Link to="/courses" style={{ color: "white" }}>Courses</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;

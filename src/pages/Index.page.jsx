import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header2 from "../components/Header";
import Home from "./Home.page";
import ProfilePage from "./Profile.page";

export default function Index() {
  return (
    <div style={{ width: "100%", maxWidth: "1920px", margin: "0 auto" }}>
      <Header2 />
      <Home />
      
    </div>
  );
}

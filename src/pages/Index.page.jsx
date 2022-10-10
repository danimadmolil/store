import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header2 from "../components/Header";
import Home from "./Home.page";
import ProfilePage from "./Profile/Profile.page";

export default function Index() {
  return (
    <>
      <Header2 />
      <Home />
    </>
  );
}

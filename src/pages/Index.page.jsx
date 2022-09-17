import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header2 from "../components/Header";

export default function Index() {
  return (
    <div style={{ width: "100vw", maxWidth: "1920px", margin: "0 auto" }}>
      <Header2 />

      <Routes>
        <Route index path="/"></Route>
        <Route path="/app" element={<h1>app</h1>}></Route>
      </Routes>
    </div>
  );
}

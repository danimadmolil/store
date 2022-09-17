import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header2 from "./components/Header";
import Index from "./pages/Index.page";
function App() {
  return (
    <div className="App">
      <Router>
        <Index />
      </Router>
    </div>
  );
}

export default App;

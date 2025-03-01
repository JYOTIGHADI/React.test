
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./Home"; // Example component
import Todo from "./component/01-03/Todo"; // Example component

function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/Todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;


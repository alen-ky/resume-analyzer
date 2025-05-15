import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DashScreen4 } from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashScreen4 />} />
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "20vh" }}>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Portfolio from "./pages/Portfolio";
import UserChat from "./components/UserChat";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import WebsiteService from "./pages/WebsiteService";
import IotService from "./pages/IotService";
import { initGA, logPageView } from "./api/googleAnalytics";

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <Router basename="/project-one">
      <RouteChangeTracker />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/chat" element={<UserChat />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
          <Route path="/jasa-pembuatan-website" element={<WebsiteService />} />
          <Route path="/jasa-pembuatan-iot" element={<IotService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

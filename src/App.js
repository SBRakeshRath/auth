import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Client from "./components/client/client";
import Admin from "./components/admin/admin";

// Import styles

import "./styles/containerStyle.sass";
import "./styles/core_style.scss";

// End Import Styles

function Index() {
  return (
    <div className="selectRoleContainer  button-column-container">
      <h1>Select Your Role</h1>
      <Link to="/client" className="link-long-button btn-active">
        Client Role
      </Link>
      <Link to="/admin" className="link-long-button btn-active">
        Admin Role
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="App" id="app">
      <Routes>
        <Route path="/admin" element={<Admin />} />

        <Route path="/client" element={<Client />} />

        <Route path="/" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;

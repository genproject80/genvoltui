import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ClientDashboard from './pages/ClientDashboard';
import Page2 from './pages/Page2';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="clientDashboard" element={<ClientDashboard />} />
          <Route path="settings" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;


/*
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';
import Dashboard from './Dashboard';
function App() {

  return (
      <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
*/
import { useState } from "react";
import { Link } from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Grades from "./pages/Grades";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Timetable from "./pages/Timetable";

import "./style.css";

function AppContent() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("liuLoggedIn") === "true"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogin() {
    sessionStorage.setItem("liuLoggedIn", "true");
    setIsAuthenticated(true);
  }

  function handleLogout() {
    sessionStorage.removeItem("liuLoggedIn");
    setIsAuthenticated(false);
    setSidebarOpen(false);
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="main-area">

        <Navbar
          openSidebar={() => setSidebarOpen(true)}
        />

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/grades"
            element={<Grades />}
          />

          <Route
            path="/schedule"
            element={<Schedule />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
          <Route
  path="/attendance"
  element={<Attendance />}
/>
<Route path="/assignments" element={<Assignments />} />
<Route path="/timetable" element={<Timetable />} />

        </Routes>

      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Bell,
  FileText,
  User,
  LogOut,
  X,
  ClipboardCheck,
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "My Courses", path: "/courses", icon: BookOpen },
  { name: "Grades", path: "/grades", icon: GraduationCap },
  { name: "Schedule", path: "/schedule", icon: CalendarDays },
  { name: "Attendance", path: "/attendance", icon: ClipboardCheck },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "My Profile", path: "/profile", icon: User },
  {name: "Assignments", path: "/assignments", icon: FileText },
   {name: "Timetable", path: "/timetable", icon: CalendarDays },
];

function Sidebar({ isOpen, closeSidebar, onLogout }) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

        <div className="brand">
          <div className="brand-logo">L</div>

          <div>
            <h2>LIU Portal</h2>
            <span>Student Dashboard</span>
          </div>

          <button
            className="close-sidebar"
            onClick={closeSidebar}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav className="sidebar-nav">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeSidebar}
              >
                <Icon size={19} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <h4>Need Help?</h4>
            <p>Contact your university support team.</p>
          </div>

          <button
            className="logout-link"
            onClick={onLogout}
            type="button"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
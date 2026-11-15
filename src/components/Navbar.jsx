import { Bell, Menu, Search } from "lucide-react";
import { student } from "../data/studentData";

function Navbar({ openSidebar }) {
  return (
    <header className="navbar">
      <button className="menu-button" onClick={openSidebar}>
        <Menu size={23} />
      </button>

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search anything..."
        />
      </div>

      <div className="navbar-right">
        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-info">
          <div className="user-avatar">M</div>
          <div className="user-text">
            <strong>{student.name}</strong>
            <span>Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
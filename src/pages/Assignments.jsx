import React, { useState } from 'react';
import '../style.css'; // تأكدي أن مسار ملف الـ CSS صحيح
import { Link } from 'react-router-dom';
export default function Assignments() {
  const [filter, setFilter] = useState('All');

  // بيانات الواجبات الظاهرة في صور مشروعك
  const assignmentsList = [
    {
      id: 1,
      title: 'Database Design Project',
      course: 'Database Systems',
      description: 'Create an ER diagram and implement database tables.',
      dueDate: '2026-11-20',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Operating Systems Research',
      course: 'Operating Systems',
      description: 'Research and explain process scheduling algorithms.',
      dueDate: '2026-11-15',
      status: 'Submitted',
      file: 'OS_Research.pdf'
    },
    {
      id: 3,
      title: 'React Web Application',
      course: 'Web Programming',
      description: 'Build a responsive React application.',
      dueDate: '2026-11-10',
      status: 'Overdue',
    },
    {
      id: 4,
      title: 'Network Configuration',
      course: 'Networking',
      description: 'Configure a network using Cisco Packet Tracer.',
      dueDate: '2026-11-25',
      status: 'Pending',
    },
    {
      id: 5,
      title: 'SQL Queries Exercise',
      course: 'Database Systems',
      description: 'Write SQL queries using joins and subqueries.',
      dueDate: '2026-11-08',
      status: 'Submitted',
      file: 'SQL_Exercise.pdf'
    }
  ];

  const filteredAssignments = filter === 'All' 
    ? assignmentsList 
    : assignmentsList.filter(item => item.status === filter);

  return (
    <div className="portal-container"
    >
      <ul>
  <li><Link to="/">Dashboard</Link></li>
  <li><Link to="/courses">My Courses</Link></li>
  <li><Link to="/grades">Grades</Link></li>
  <li><Link to="/schedule">Schedule</Link></li>
  <li><Link to="/attendance">Attendance</Link></li>
  <li><Link to="/notifications">Notifications</Link></li>
  <li><Link to="/profile">My Profile</Link></li>
  <li className="active"><Link to="/assignments">Assignments</Link></li>
</ul>
      {/* القائمة الجانبية - Sidebar */}
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-box">L</div>
          <div>
            <h2>LIU Portal</h2>
            <span>Student Dashboard</span>
          </div>
        </div>

        <div className="menu-section">
          <p className="menu-title">MAIN MENU</p>
          <ul>
            <li><a Link="#">Dashboard</a></li>
            <li><a Link="#">My Courses</a></li>
            <li><a Link="#">Grades</a></li>
            <li><a Link="#">Schedule</a></li>
            <li><a Link="#">Attendance</a></li>
            <li><a Link="#">Notifications</a></li>
            <li><a Link="#">My Profile</a></li>
            <li className="active"><a Link="#">Assignments</a></li>
          </ul>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="main-content">
        <header className="content-header">
          <div>
            <h1>Assignments Management</h1>
            <p>Manage your academic tasks and keep track of deadlines.</p>
          </div>
          <input type="text" placeholder="Search anything..." className="global-search" />
        </header>

        {/* إحصائيات سريعة (Cards) */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">5</span>
            <span className="stat-label">Total Assignments</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2</span>
            <span className="stat-label">Submitted</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">1</span>
            <span className="stat-label">Overdue</span>
          </div>
        </div>

        {/* شريط البحث والتصفية */}
        <div className="filter-bar">
          <input type="text" placeholder="Search assignments or courses..." className="search-input" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="All">All Assignments</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        {/* قائمة المهام */}
        <div className="assignments-list">
          {filteredAssignments.map((item) => (
            <div key={item.id} className={`assignment-card ${item.status.toLowerCase()}`}>
              <div className="card-badge">{item.status}</div>
              <h3>{item.title}</h3>
              <p className="course-name">📖 {item.course}</p>
              <p className="description">{item.description}</p>
              <div className="card-footer">
                <span>📅 Due: {item.dueDate}</span>
                {item.file && <span className="file-link">📎 {item.file}</span>}
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
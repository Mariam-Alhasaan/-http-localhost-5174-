import { useLocation } from "react-router-dom";

function Placeholder() {
  const location = useLocation();

  const pageNames = {
    "/courses": "My Courses",
    "/grades": "My Grades",
    "/schedule": "My Schedule",
    "/profile": "My Profile",
  };

  const title = pageNames[location.pathname] || "Page";

  return (
    <main className="dashboard">
      <section className="welcome-section">
        <div>
          <p className="welcome-label">STUDENT PORTAL</p>
          <h1>{title}</h1>
          <p>This section will be developed in the next phase.</p>
        </div>
      </section>

      <div className="content-card placeholder-card">
        <h2>{title}</h2>
        <p>Welcome to the {title} section.</p>
        <span>More features coming soon.</span>
      </div>
    </main>
  );
}

export default Placeholder;
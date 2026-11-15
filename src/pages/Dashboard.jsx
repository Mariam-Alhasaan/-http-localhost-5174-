import {
  BookOpen,
  GraduationCap,
  CalendarDays,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import { student, courses, schedule } from "../data/studentData";

function Dashboard() {
  const stats = [
    {
      title: "Enrolled Courses",
      value: courses.length,
      icon: BookOpen,
      color: "green",
    },
    {
      title: "Current GPA",
      value: student.gpa.toFixed(2),
      icon: GraduationCap,
      color: "cream",
    },
    {
      title: "Credit Hours",
      value: courses.reduce((total, course) => total + course.credits, 0),
      icon: CalendarDays,
      color: "pink",
    },
  ];

  return (
    <main className="dashboard">
      <section className="welcome-section">
        <div>
          <p className="welcome-label">STUDENT OVERVIEW</p>
          <h1>Welcome back, {student.name.split(" ")[0]}! 👋</h1>
          <p>Here is what's happening with your studies today.</p>
        </div>

        <div className="semester-badge">
          <CalendarDays size={17} />
          {student.semester}
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="stat-card" key={stat.title}>
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>

              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <span className="stat-caption">
                Current semester
              </span>
            </article>
          );
        })}
      </section>

      <section className="content-grid">
        <div className="content-card">
          <div className="section-heading">
            <div>
              <h2>My Courses</h2>
              <p>Your currently enrolled courses</p>
            </div>
            <ArrowUpRight size={20} />
          </div>

          <div className="course-list">
            {courses.map((course) => (
              <div className="course-item" key={course.code}>
                <div className={`course-icon ${course.color}`}>
                  <BookOpen size={21} />
                </div>

                <div className="course-details">
                  <strong>{course.name}</strong>
                  <span>{course.code} · {course.credits} Credits</span>
                  <small>{course.instructor}</small>
                </div>

                <span className="course-status">Enrolled</span>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <div className="section-heading">
            <div>
              <h2>Upcoming Classes</h2>
              <p>Your weekly schedule</p>
            </div>
            <Clock size={20} />
          </div>

          <div className="schedule-list">
            {schedule.map((item, index) => (
              <div className="schedule-item" key={index}>
                <div className="schedule-date">
                  <span>{item.day.slice(0, 3)}</span>
                  <strong>{item.time}</strong>
                </div>

                <div className="schedule-course">
                  <strong>{item.course}</strong>
                  <span>University Lecture</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="student-info-card">
        <div>
          <span>STUDENT INFORMATION</span>
          <h3>{student.university}</h3>
          <p>{student.major}</p>
        </div>

        <div className="student-id">
          <span>Student ID</span>
          <strong>{student.id}</strong>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
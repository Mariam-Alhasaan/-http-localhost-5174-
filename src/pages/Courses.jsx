import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Clock,
  Trash2,
  Plus,
  X,
} from "lucide-react";

import { initialCourses } from "../data/studentData";

function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    instructor: "",
    credits: "3",
    department: "Computer Science",
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" ||
        course.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [courses, search, department]);

  const totalCredits = courses.reduce(
    (total, course) => total + course.credits,
    0
  );

  function handleAddCourse(e) {
    e.preventDefault();

    const course = {
      ...newCourse,
      id: Date.now(),
      credits: Number(newCourse.credits),
      color: "green",
      schedule: "To be announced",
    };

    setCourses((previous) => [...previous, course]);

    setNewCourse({
      code: "",
      name: "",
      instructor: "",
      credits: "3",
      department: "Computer Science",
    });

    setShowForm(false);
  }

  function handleDeleteCourse(id) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this course?"
    );

    if (confirmed) {
      setCourses((previous) =>
        previous.filter((course) => course.id !== id)
      );
    }
  }

  return (
    <main className="dashboard courses-page">

      <section className="welcome-section">
        <div>
          <p className="welcome-label">ACADEMIC MANAGEMENT</p>
          <h1>My Courses</h1>
          <p>Manage and explore your enrolled courses.</p>
        </div>

        <button
          className="add-course-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close Form" : "Add Course"}
        </button>
      </section>

      <section className="course-summary-grid">

        <div className="course-summary-card">
          <BookOpen size={23} />
          <div>
            <span>Total Courses</span>
            <h2>{courses.length}</h2>
          </div>
        </div>

        <div className="course-summary-card">
          <Clock size={23} />
          <div>
            <span>Total Credit Hours</span>
            <h2>{totalCredits}</h2>
          </div>
        </div>

      </section>

      {showForm && (
        <section className="content-card add-course-form">

          <h2>Add a New Course</h2>
          <p>Enter the course information below.</p>

          <form onSubmit={handleAddCourse}>

            <div className="form-grid">

              <input
                placeholder="Course Code"
                value={newCourse.code}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    code: e.target.value.toUpperCase(),
                  })
                }
                required
              />

              <input
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                placeholder="Instructor Name"
                value={newCourse.instructor}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    instructor: e.target.value,
                  })
                }
                required
              />

              <select
                value={newCourse.credits}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    credits: e.target.value,
                  })
                }
              >
                <option value="1">1 Credit</option>
                <option value="2">2 Credits</option>
                <option value="3">3 Credits</option>
                <option value="4">4 Credits</option>
              </select>

              <select
                value={newCourse.department}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    department: e.target.value,
                  })
                }
              >
                <option value="Computer Science">
                  Computer Science
                </option>
                <option value="Mathematics">
                  Mathematics
                </option>
                <option value="Business">
                  Business
                </option>
              </select>

            </div>

            <button type="submit" className="save-course-button">
              <Plus size={17} />
              Save Course
            </button>

          </form>
        </section>
      )}

      <section className="content-card courses-management">

        <div className="section-heading">
          <div>
            <h2>Enrolled Courses</h2>
            <p>Browse your current academic courses.</p>
          </div>
        </div>

        <div className="course-filters">

          <div className="search-box course-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search by course name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="department-filter"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">
              Computer Science
            </option>
            <option value="Mathematics">Mathematics</option>
            <option value="Business">Business</option>
          </select>

        </div>

        <div className="managed-course-list">

          {filteredCourses.length > 0 ? (

            filteredCourses.map((course) => (

              <article className="managed-course-card" key={course.id}>

                <div className={`course-icon ${course.color}`}>
                  <BookOpen size={23} />
                </div>

                <div className="managed-course-info">
                  <span className="managed-course-code">
                    {course.code}
                  </span>

                  <h3>{course.name}</h3>

                  <p>{course.instructor}</p>

                  <span className="managed-course-department">
                    {course.department}
                  </span>
                </div>

                <div className="managed-course-details">
                  <span>Credit Hours</span>
                  <strong>{course.credits}</strong>
                </div>

                <button
                  className="delete-course-button"
                  onClick={() => handleDeleteCourse(course.id)}
                  title="Remove course"
                  aria-label={`Remove ${course.name}`}
                >
                  <Trash2 size={19} />
                </button>

              </article>

            ))

          ) : (

            <div className="empty-courses">
              <BookOpen size={35} />
              <h3>No courses found</h3>
              <p>Try changing your search or department filter.</p>
            </div>

          )}

        </div>

        <div className="courses-footer">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>

      </section>

    </main>
  );
}

export default Courses;
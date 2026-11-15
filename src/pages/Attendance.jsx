import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BookOpen,
} from "lucide-react";

import "./Attendance.css";

const initialRecords = [
  {
    id: 1,
    course: "Computer Networks",
    code: "CSCI342",
    date: "2026-11-12",
    status: "Present",
  },
  {
    id: 2,
    course: "Operating Systems",
    code: "CSCI380",
    date: "2026-11-11",
    status: "Present",
  },
  {
    id: 3,
    course: "Web Programming",
    code: "CSCI370",
    date: "2026-11-10",
    status: "Absent",
  },
  {
    id: 4,
    course: "Computer Networks",
    code: "CSCI342",
    date: "2026-11-09",
    status: "Late",
  },
  {
    id: 5,
    course: "Operating Systems",
    code: "CSCI380",
    date: "2026-11-08",
    status: "Present",
  },
  {
    id: 6,
    course: "Web Programming",
    code: "CSCI370",
    date: "2026-11-07",
    status: "Present",
  },
  {
    id: 7,
    course: "Computer Networks",
    code: "CSCI342",
    date: "2026-11-06",
    status: "Present",
  },
  {
    id: 8,
    course: "Operating Systems",
    code: "CSCI380",
    date: "2026-11-05",
    status: "Absent",
  },
  {
    id: 9,
    course: "Web Programming",
    code: "CSCI370",
    date: "2026-11-04",
    status: "Late",
  },
];

const courses = [
  "All Courses",
  "Computer Networks",
  "Operating Systems",
  "Web Programming",
];

function Attendance() {
  const [records] = useState(() => {
    try {
      const saved = localStorage.getItem("studentAttendance");
      return saved ? JSON.parse(saved) : initialRecords;
    } catch {
      return initialRecords;
    }
  });

  const [selectedCourse, setSelectedCourse] =
    useState("All Courses");

  const filteredRecords = useMemo(() => {
    if (selectedCourse === "All Courses") {
      return records;
    }

    return records.filter(
      (record) => record.course === selectedCourse
    );
  }, [records, selectedCourse]);

  const presentCount = filteredRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = filteredRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = filteredRecords.filter(
    (record) => record.status === "Late"
  ).length;

  const totalCount = filteredRecords.length;

  const attendanceRate =
    totalCount === 0
      ? 0
      : Math.round((presentCount / totalCount) * 100);

  const courseStats = courses
    .filter((course) => course !== "All Courses")
    .map((course) => {
      const courseRecords = records.filter(
        (record) => record.course === course
      );

      const present = courseRecords.filter(
        (record) => record.status === "Present"
      ).length;

      const percentage =
        courseRecords.length === 0
          ? 0
          : Math.round(
              (present / courseRecords.length) * 100
            );

      return {
        course,
        total: courseRecords.length,
        present,
        percentage,
      };
    });

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="attendance-page">

      {/* Page Header */}
      <div className="attendance-header">
        <div>
          <h1>Attendance Management</h1>
          <p>
            Track your attendance and academic participation.
          </p>
        </div>

        <div className="attendance-header-icon">
          <CalendarDays size={26} />
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="attendance-overview">

        <div className="attendance-card rate-card">
          <div className="attendance-card-icon">
            <TrendingUp size={22} />
          </div>

          <div>
            <p>Attendance Rate</p>
            <h2>{attendanceRate}%</h2>
          </div>

          <div className="rate-progress">
            <div
              className="rate-progress-fill"
              style={{ width: `${attendanceRate}%` }}
            ></div>
          </div>
        </div>

        <div className="attendance-card">
          <div className="attendance-card-icon present-icon">
            <CheckCircle size={22} />
          </div>

          <div>
            <p>Present</p>
            <h2>{presentCount}</h2>
          </div>
        </div>

        <div className="attendance-card">
          <div className="attendance-card-icon absent-icon">
            <XCircle size={22} />
          </div>

          <div>
            <p>Absent</p>
            <h2>{absentCount}</h2>
          </div>
        </div>

        <div className="attendance-card">
          <div className="attendance-card-icon late-icon">
            <Clock size={22} />
          </div>

          <div>
            <p>Late</p>
            <h2>{lateCount}</h2>
          </div>
        </div>

      </div>

      {/* Course Attendance */}
      <section className="attendance-section">

        <div className="attendance-section-header">
          <div>
            <h2>Course Attendance</h2>
            <p>View your attendance in each course.</p>
          </div>
        </div>

        <div className="course-attendance-grid">

          {courseStats.map((course) => (
            <div
              className="course-attendance-card"
              key={course.course}
            >
              <div className="course-attendance-heading">
                <div className="course-icon">
                  <BookOpen size={20} />
                </div>

                <span>{course.percentage}%</span>
              </div>

              <h3>{course.course}</h3>

              <p>
                {course.present} present out of {course.total} classes
              </p>

              <div className="course-progress">
                <div
                  className="course-progress-fill"
                  style={{
                    width: `${course.percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* Attendance History */}
      <section className="attendance-section history-section">

        <div className="attendance-section-header">
          <div>
            <h2>Attendance History</h2>
            <p>Review your previous class attendance.</p>
          </div>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="attendance-filter"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="attendance-table-wrapper">

          <table className="attendance-table">

            <thead>
              <tr>
                <th>Course</th>
                <th>Course Code</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.course}</td>
                    <td>{record.code}</td>
                    <td>
                      {new Date(
                        record.date + "T12:00:00"
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <span
                        className={`attendance-status ${getStatusClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="attendance-no-data">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Attendance;
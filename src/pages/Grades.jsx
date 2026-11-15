import { useMemo } from "react";
import {
  Award,
  BookOpen,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

import { initialGrades } from "../data/studentData";

function calculateGrade(total) {
  if (total >= 90) return { letter: "A", points: 4.0 };
  if (total >= 85) return { letter: "A-", points: 3.7 };
  if (total >= 80) return { letter: "B+", points: 3.3 };
  if (total >= 75) return { letter: "B", points: 3.0 };
  if (total >= 70) return { letter: "C+", points: 2.3 };
  if (total >= 65) return { letter: "C", points: 2.0 };
  if (total >= 60) return { letter: "D", points: 1.0 };

  return { letter: "F", points: 0.0 };
}

function Grades() {
  // Calculate the final mark and letter grade for each course
  const grades = useMemo(() => {
    return initialGrades.map((course) => {
      const total =
        course.assignments + course.midterm + course.final;

      const grade = calculateGrade(total);

      return {
        ...course,
        total,
        letter: grade.letter,
        points: grade.points,
      };
    });
  }, []);

  // Calculate average mark and weighted GPA
  const statistics = useMemo(() => {
    const totalCredits = grades.reduce(
      (sum, course) => sum + course.credits,
      0
    );

    const weightedMarks = grades.reduce(
      (sum, course) => sum + course.total * course.credits,
      0
    );

    const weightedPoints = grades.reduce(
      (sum, course) => sum + course.points * course.credits,
      0
    );

    return {
      average: totalCredits ? weightedMarks / totalCredits : 0,
      gpa: totalCredits ? weightedPoints / totalCredits : 0,
      courseCount: grades.length,
    };
  }, [grades]);

  return (
    <main className="grades-page">
      <div className="grades-heading">
        <div>
          <p className="page-eyebrow">ACADEMIC PERFORMANCE</p>
          <h1>Grades & GPA</h1>
          <p className="grades-subtitle">
            Track your academic progress and course results.
          </p>
        </div>

        <div className="grades-semester">
          <GraduationCap size={20} />
          <span>Fall 2026</span>
        </div>
      </div>

      {/* Summary cards */}
      <section className="grades-summary">
        <div className="grade-stat-card">
          <div className="grade-stat-icon">
            <BookOpen size={21} />
          </div>
          <p>Graded Courses</p>
          <h2>{statistics.courseCount}</h2>
          <span>Courses included</span>
        </div>

        <div className="grade-stat-card">
          <div className="grade-stat-icon">
            <Award size={21} />
          </div>
          <p>Overall Average</p>
          <h2>{statistics.average.toFixed(1)}%</h2>
          <span>Out of 100</span>
        </div>

        <div className="grade-stat-card">
          <div className="grade-stat-icon">
            <TrendingUp size={21} />
          </div>
          <p>Estimated GPA</p>
          <h2>{statistics.gpa.toFixed(2)}</h2>
          <span>Out of 4.00</span>
        </div>
      </section>

      {/* Grades table */}
      <section className="grades-table-section">
        <div className="grades-section-heading">
          <div>
            <h2>Course Results</h2>
            <p>Your marks and final grades</p>
          </div>

          <span className="results-count">
            {grades.length} Courses
          </span>
        </div>

        <div className="grades-table-wrapper">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Assignments</th>
                <th>Midterm</th>
                <th>Final</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {grades.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="grade-course-name">
                      <strong>{course.courseCode}</strong>
                      <span>{course.courseName}</span>
                    </div>
                  </td>

                  <td>
                    {course.assignments}/{course.maxAssignments}
                  </td>

                  <td>
                    {course.midterm}/{course.maxMidterm}
                  </td>

                  <td>
                    {course.final}/{course.maxFinal}
                  </td>

                  <td>
                    <strong>{course.total}/100</strong>
                  </td>

                  <td>
                    <span
                      className={`letter-grade grade-${course.letter.replace(
                        "+",
                        "plus"
                      ).replace("-", "minus")}`}
                    >
                      {course.letter}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Performance progress */}
      <section className="performance-section">
        <div className="grades-section-heading">
          <div>
            <h2>Course Performance</h2>
            <p>Visual overview of your results</p>
          </div>
        </div>

        <div className="performance-list">
          {grades.map((course) => (
            <div className="performance-item" key={course.id}>
              <div className="performance-info">
                <div>
                  <strong>{course.courseCode}</strong>
                  <span>{course.courseName}</span>
                </div>

                <strong>{course.total}%</strong>
              </div>

              <div className="performance-track">
                <div
                  className="performance-fill"
                  style={{ width: `${course.total}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="grades-disclaimer">
        Demo data only. Grades and GPA are calculated using the
        sample grading scale configured for this project.
      </p>
    </main>
  );
}

export default Grades;
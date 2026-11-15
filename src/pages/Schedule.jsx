import { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const shortDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const initialSchedule = [
  {
    id: 1,
    day: "Monday",
    time: "09:00 AM",
    endTime: "10:30 AM",
    code: "CSCI426",
    name: "Advanced Web Programming",
    room: "Room 204",
    instructor: "Dr. Ahmad",
    color: "sage",
  },
  {
    id: 2,
    day: "Tuesday",
    time: "11:00 AM",
    endTime: "12:30 PM",
    code: "CSCI342",
    name: "Computer Networks",
    room: "Room 105",
    instructor: "Dr. Sarah",
    color: "cream",
  },
  {
    id: 3,
    day: "Wednesday",
    time: "10:00 AM",
    endTime: "11:30 AM",
    code: "CSCI361",
    name: "Introduction to Cryptography",
    room: "Lab 3",
    instructor: "Dr. Ali",
    color: "pink",
  },
  {
    id: 4,
    day: "Thursday",
    time: "12:00 PM",
    endTime: "01:30 PM",
    code: "MATH201",
    name: "Discrete Mathematics",
    room: "Room 302",
    instructor: "Dr. Lina",
    color: "sage",
  },
  {
    id: 5,
    day: "Friday",
    time: "09:00 AM",
    endTime: "10:30 AM",
    code: "CSCI390",
    name: "Software Engineering",
    room: "Room 201",
    instructor: "Dr. Omar",
    color: "cream",
  },
];

function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const dayClasses = initialSchedule.filter(
    (item) => item.day === selectedDay
  );

  const selectedIndex = weekDays.indexOf(selectedDay);

  function goToPreviousDay() {
    const newIndex =
      selectedIndex === 0 ? weekDays.length - 1 : selectedIndex - 1;

    setSelectedDay(weekDays[newIndex]);
  }

  function goToNextDay() {
    const newIndex =
      selectedIndex === weekDays.length - 1 ? 0 : selectedIndex + 1;

    setSelectedDay(weekDays[newIndex]);
  }

  return (
    <main className="schedule-page">
      {/* Page heading */}
      <div className="schedule-heading">
        <div>
          <p className="page-eyebrow">MY ACADEMIC PLANNER</p>
          <h1>Class Schedule</h1>
          <p className="schedule-subtitle">
            Organize your weekly lectures and stay on track.
          </p>
        </div>

        <div className="schedule-semester">
          <CalendarDays size={20} />
          <span>Fall 2026</span>
        </div>
      </div>

      {/* Summary */}
      <section className="schedule-summary">
        <div className="schedule-summary-card">
          <div className="schedule-summary-icon">
            <BookOpen size={21} />
          </div>
          <div>
            <span>Total Courses</span>
            <h2>{initialSchedule.length}</h2>
          </div>
        </div>

        <div className="schedule-summary-card">
          <div className="schedule-summary-icon">
            <CalendarDays size={21} />
          </div>
          <div>
            <span>Study Days</span>
            <h2>{weekDays.length}</h2>
          </div>
        </div>

        <div className="schedule-summary-card">
          <div className="schedule-summary-icon">
            <Clock size={21} />
          </div>
          <div>
            <span>Classes Today</span>
            <h2>{dayClasses.length}</h2>
          </div>
        </div>
      </section>

      {/* Day selector */}
      <section className="schedule-calendar">
        <div className="schedule-calendar-heading">
          <div>
            <h2>Weekly Calendar</h2>
            <p>Select a day to view your classes.</p>
          </div>

          <div className="day-navigation">
            <button
              type="button"
              onClick={goToPreviousDay}
              aria-label="Previous day"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={goToNextDay}
              aria-label="Next day"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div className="week-day-selector">
          {weekDays.map((day, index) => (
            <button
              key={day}
              type="button"
              className={`week-day-button ${
                selectedDay === day ? "active" : ""
              }`}
              onClick={() => setSelectedDay(day)}
            >
              <span>{shortDays[index]}</span>
              <strong>{index + 1}</strong>
            </button>
          ))}
        </div>

        {/* Selected day classes */}
        <div className="selected-day-heading">
          <div>
            <span className="selected-day-label">SELECTED DAY</span>
            <h3>{selectedDay}</h3>
          </div>

          <span className="class-count">
            {dayClasses.length}{" "}
            {dayClasses.length === 1 ? "Class" : "Classes"}
          </span>
        </div>

        <div className="daily-classes">
          {dayClasses.length > 0 ? (
            dayClasses.map((item) => (
              <article
                className={`schedule-class-card ${item.color}`}
                key={item.id}
              >
                <div className="class-time">
                  <Clock size={17} />
                  <strong>{item.time}</strong>
                  <span>{item.endTime}</span>
                </div>

                <div className="class-details">
                  <span className="class-code">{item.code}</span>
                  <h3>{item.name}</h3>
                  <p>{item.instructor}</p>

                  <div className="class-location">
                    <MapPin size={15} />
                    <span>{item.room}</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-classes">
              <CalendarDays size={35} />
              <h3>No classes scheduled</h3>
              <p>Enjoy your free day!</p>
            </div>
          )}
        </div>
      </section>

      <p className="schedule-disclaimer">
        Sample weekly schedule for demonstration purposes.
      </p>
    </main>
  );
}

export default Schedule;
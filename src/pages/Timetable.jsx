import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  BookOpen,
  Plus,
  Trash2,
  GraduationCap,
} from "lucide-react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const initialSchedule = [
  {
    id: 1,
    course: "Database Systems",
    code: "CSCI 342",
    instructor: "Dr. Ahmad",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    room: "Room 204",
  },
  {
    id: 2,
    course: "Operating Systems",
    code: "CSCI 351",
    instructor: "Dr. Sara",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
    room: "Lab 102",
  },
  {
    id: 3,
    course: "Web Programming",
    code: "CSC 1370",
    instructor: "Dr. Ali",
    day: "Tuesday",
    startTime: "10:00",
    endTime: "11:30",
    room: "Room 305",
  },
  {
    id: 4,
    course: "Networking",
    code: "CSCI 342",
    instructor: "Dr. Rami",
    day: "Wednesday",
    startTime: "09:00",
    endTime: "10:30",
    room: "Lab 201",
  },
  {
    id: 5,
    course: "Mobile Application",
    code: "CSC 1410",
    instructor: "Dr. Maya",
    day: "Thursday",
    startTime: "12:00",
    endTime: "13:30",
    room: "Room 110",
  },
  {
    id: 6,
    course: "Database Systems",
    code: "CSCI 342",
    instructor: "Dr. Ahmad",
    day: "Friday",
    startTime: "09:00",
    endTime: "10:30",
    room: "Room 204",
  },
];

const emptyForm = {
  course: "",
  code: "",
  instructor: "",
  day: "Monday",
  startTime: "09:00",
  endTime: "10:30",
  room: "",
};

export default function Timetable() {
  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem("liuTimetable");
      return saved ? JSON.parse(saved) : initialSchedule;
    } catch {
      return initialSchedule;
    }
  });

  const [selectedDay, setSelectedDay] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("liuTimetable", JSON.stringify(schedule));
  }, [schedule]);

  const sortedSchedule = [...schedule].sort((a, b) => {
    const dayDifference =
      days.indexOf(a.day) - days.indexOf(b.day);

    return dayDifference ||
      a.startTime.localeCompare(b.startTime);
  });

  const filteredSchedule =
    selectedDay === "All"
      ? sortedSchedule
      : sortedSchedule.filter(
          item => item.day === selectedDay
        );

  const addClass = (e) => {
    e.preventDefault();
    setError("");

    if (!form.course.trim() || !form.instructor.trim() || !form.room.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.startTime >= form.endTime) {
      setError("End time must be after start time.");
      return;
    }

    const hasConflict = schedule.some(item => {
      if (item.day !== form.day) return false;

      return (
        form.startTime < item.endTime &&
        form.endTime > item.startTime
      );
    });

    if (hasConflict) {
      setError("This time conflicts with another class on this day.");
      return;
    }

    setSchedule(prev => [
      ...prev,
      { ...form, id: Date.now() },
    ]);

    setForm(emptyForm);
    setShowForm(false);
  };

  const deleteClass = (id) => {
    if (!window.confirm("Delete this class from your timetable?")) {
      return;
    }

    setSchedule(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const totalClasses = schedule.length;
  const totalDays = new Set(schedule.map(item => item.day)).size;

  return (
    <div className="min-h-screen bg-[#F8F7F2] p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

          <div>
            <p className="text-sm text-[#829487] mb-2">
              Student Portal / Timetable
            </p>

            <h1 className="text-3xl font-bold text-[#34483D]">
              Weekly Timetable
            </h1>

            <p className="text-gray-500 mt-2">
              Organize your lectures and manage your weekly schedule.
            </p>
          </div>

          <button
            onClick={() => {
              setError("");
              setForm(emptyForm);
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 bg-[#668675] hover:bg-[#526E5F] text-white px-5 py-3 rounded-xl h-fit"
          >
            <Plus size={19} />
            Add Class
          </button>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          <SummaryCard
            title="Total Classes"
            value={totalClasses}
            icon={<BookOpen />}
          />

          <SummaryCard
            title="Active Days"
            value={`${totalDays} Days`}
            icon={<CalendarDays />}
          />

          <SummaryCard
            title="Weekly Schedule"
            value="2026 - 2027"
            icon={<GraduationCap />}
          />

        </div>

        {/* Day Filter */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">

          <h2 className="font-semibold text-[#34483D] mb-4">
            Select Day
          </h2>

          <div className="flex gap-2 flex-wrap">

            {["All", ...days].map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedDay === day
                    ? "bg-[#668675] text-white"
                    : "bg-[#F1F3EF] text-gray-600 hover:bg-[#E3EAE4]"
                }`}
              >
                {day}
              </button>
            ))}

          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#34483D]">
              {selectedDay === "All"
                ? "All Lectures"
                : `${selectedDay} Lectures`}
            </h2>

            <span className="text-sm text-gray-400">
              {filteredSchedule.length} Classes
            </span>
          </div>

          <div className="space-y-4">

            {filteredSchedule.map(item => (
              <div
                key={item.id}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition"
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  <div className="flex gap-4 items-start">

                    <div className="bg-[#EAF0EB] text-[#668675] p-3 rounded-xl">
                      <BookOpen size={23} />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#34483D] text-lg">
                        {item.course}
                      </h3>

                      <p className="text-sm text-[#829487] mt-1">
                        {item.code}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        {item.instructor}
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 md:flex gap-4 md:gap-6">

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Day
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {item.day}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Time
                      </p>
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Clock size={14} />
                        {item.startTime} - {item.endTime}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Location
                      </p>
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <MapPin size={14} />
                        {item.room}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => deleteClass(item.id)}
                    title="Delete class"
                    className="p-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            ))}

            {filteredSchedule.length === 0 && (
              <div className="text-center py-12">
                <CalendarDays
                  size={40}
                  className="mx-auto text-gray-300 mb-3"
                />
                <p className="text-gray-500">
                  No classes scheduled for this day.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Add Class Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

            <div className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold text-[#34483D]">
                  Add New Class
                </h2>

                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-red-500 text-xl"
                >
                  ✕
                </button>

              </div>

              <form onSubmit={addClass} className="space-y-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Course Name
                  </label>
                  <input
                    required
                    value={form.course}
                    onChange={e => setForm({
                      ...form,
                      course: e.target.value
                    })}
                    placeholder="Enter course name"
                    className="w-full border rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Course Code
                  </label>
                  <input
                    value={form.code}
                    onChange={e => setForm({
                      ...form,
                      code: e.target.value
                    })}
                    placeholder="Example: CSCI 342"
                    className="w-full border rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Instructor
                  </label>
                  <input
                    required
                    value={form.instructor}
                    onChange={e => setForm({
                      ...form,
                      instructor: e.target.value
                    })}
                    placeholder="Instructor name"
                    className="w-full border rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Day
                  </label>
                  <select
                    value={form.day}
                    onChange={e => setForm({
                      ...form,
                      day: e.target.value
                    })}
                    className="w-full border rounded-xl p-3"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      required
                      value={form.startTime}
                      onChange={e => setForm({
                        ...form,
                        startTime: e.target.value
                      })}
                      className="w-full border rounded-xl p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      required
                      value={form.endTime}
                      onChange={e => setForm({
                        ...form,
                        endTime: e.target.value
                      })}
                      className="w-full border rounded-xl p-3"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Room
                  </label>
                  <input
                    required
                    value={form.room}
                    onChange={e => setForm({
                      ...form,
                      room: e.target.value
                    })}
                    placeholder="Example: Room 204"
                    className="w-full border rounded-xl p-3"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#668675] hover:bg-[#526E5F] text-white rounded-xl py-3 font-medium"
                >
                  Save Class
                </button>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-[#34483D] mt-2">
            {value}
          </h3>
        </div>

        <div className="p-3 rounded-xl bg-[#EAF0EB] text-[#668675]">
          {icon}
        </div>

      </div>
    </div>
  );
}
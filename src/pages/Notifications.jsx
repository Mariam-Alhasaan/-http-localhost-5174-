import { useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Check,
  CheckCheck,
  Clock,
  ClipboardList,
} from "lucide-react";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    title: "New Grade Available",
    message: "Your grade for Computer Networks is now available.",
    date: "November 12, 2026",
    time: "10:30 AM",
    type: "grade",
    read: false,
  },
  {
    id: 2,
    title: "Upcoming Exam",
    message: "Your Operating Systems exam is scheduled soon.",
    date: "November 11, 2026",
    time: "02:00 PM",
    type: "exam",
    read: false,
  },
  {
    id: 3,
    title: "New Assignment",
    message: "A new assignment has been added to your courses.",
    date: "November 10, 2026",
    time: "09:15 AM",
    type: "assignment",
    read: true,
  },
  {
    id: 4,
    title: "Course Update",
    message: "Your Web Programming course information has been updated.",
    date: "November 9, 2026",
    time: "11:00 AM",
    type: "course",
    read: true,
  },
  {
    id: 5,
    title: "Class Schedule Updated",
    message: "Please check your updated academic schedule.",
    date: "November 8, 2026",
    time: "08:45 AM",
    type: "schedule",
    read: true,
  },
];

const notificationIcons = {
  grade: GraduationCap,
  exam: CalendarDays,
  assignment: ClipboardList,
  course: BookOpen,
  schedule: Clock,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("studentNotifications");
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(
      "studentNotifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((notification) => !notification.read)
      : notifications;

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="notifications-page">

      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your academic activities.</p>
        </div>

        <div className="notification-bell">
          <Bell size={25} />
          {unreadCount > 0 && (
            <span>{unreadCount}</span>
          )}
        </div>
      </div>

      <div className="notification-stats">

        <div className="notification-stat-card">
          <div className="stat-icon total-icon">
            <Bell size={22} />
          </div>
          <div>
            <h2>{notifications.length}</h2>
            <p>Total Notifications</p>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="stat-icon unread-icon">
            <Clock size={22} />
          </div>
          <div>
            <h2>{unreadCount}</h2>
            <p>Unread Notifications</p>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="stat-icon read-icon">
            <CheckCheck size={22} />
          </div>
          <div>
            <h2>{notifications.length - unreadCount}</h2>
            <p>Read Notifications</p>
          </div>
        </div>

      </div>

      <div className="notification-content">

        <div className="notification-toolbar">
          <div>
            <h2>Recent Activity</h2>
            <p>Manage your university notifications.</p>
          </div>

          <button
            className="mark-all-btn"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={17} />
            Mark All as Read
          </button>
        </div>

        <div className="notification-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All ({notifications.length})
          </button>

          <button
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>

        <div className="notification-list">

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const Icon =
                notificationIcons[notification.type] || Bell;

              return (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.read ? "unread" : ""
                  }`}
                >

                  <div className={`notification-type-icon ${notification.type}`}>
                    <Icon size={22} />
                  </div>

                  <div className="notification-details">
                    <div className="notification-title-row">
                      <h3>{notification.title}</h3>

                      {!notification.read && (
                        <span className="unread-label">
                          New
                        </span>
                      )}
                    </div>

                    <p>{notification.message}</p>

                    <div className="notification-date">
                      <CalendarDays size={14} />
                      <span>{notification.date}</span>
                      <Clock size={14} />
                      <span>{notification.time}</span>
                    </div>
                  </div>

                  {!notification.read && (
                    <button
                      className="mark-read-btn"
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <Check size={18} />
                      <span>Mark as read</span>
                    </button>
                  )}

                </div>
              );
            })
          ) : (
            <div className="notification-empty">
              <Bell size={38} />
              <h3>No unread notifications</h3>
              <p>You are all caught up!</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
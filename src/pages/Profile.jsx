import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  IdCard,
  Pencil,
  Save,
  X,
} from "lucide-react";
import "./Profile.css";

const defaultProfile = {
  fullName: "Mariam Al Hassan",
  studentId: "LIU-2026-001",
  email: "student@liu.edu.lb",
  phone: "+961 70 000 000",
  major: "Computer Science",
  university: "Lebanese International University",
  campus: "Tripoli Campus",
  year: "Third Year",
};

export default function Profile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("studentProfile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    setProfile(formData);
    setIsEditing(false);
    setMessage("Profile updated successfully!");

    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      icon: User,
    },
    {
      name: "studentId",
      label: "Student ID",
      icon: IdCard,
    },
    {
      name: "email",
      label: "Email Address",
      icon: Mail,
    },
    {
      name: "phone",
      label: "Phone Number",
      icon: Phone,
    },
    {
      name: "major",
      label: "Major",
      icon: GraduationCap,
    },
    {
      name: "university",
      label: "University",
      icon: GraduationCap,
    },
    {
      name: "campus",
      label: "Campus",
      icon: GraduationCap,
    },
    {
      name: "year",
      label: "Academic Year",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal and academic information.</p>
        </div>

        {!isEditing && (
          <button
            className="profile-edit-btn"
            onClick={() => {
              setFormData(profile);
              setIsEditing(true);
            }}
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {message && (
        <div className="profile-success">
          {message}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-banner">
          <div className="profile-avatar">
            <User size={42} />
          </div>

          <div className="profile-heading">
            <h2>{profile.fullName}</h2>
            <p>{profile.major}</p>
            <span>{profile.campus}</span>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="profile-section-title">
            <h3>Personal & Academic Information</h3>
            <p>Your student information and university details.</p>
          </div>

          <div className="profile-grid">
            {fields.map((field) => {
              const Icon = field.icon;

              return (
                <div className="profile-field" key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label}
                  </label>

                  <div className="profile-input-wrapper">
                    <Icon size={18} />

                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={isEditing ? formData[field.name] : profile[field.name]}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {isEditing && (
            <div className="profile-actions">
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={handleCancel}
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-btn"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
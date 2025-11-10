import { Link } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("employee");
    window.location.href = "/"; // full reload only on logout
  };

  return (
    <nav
      className="navbar px-4 shadow-lg"
      style={{
        background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
        color: "#fff",
        padding: "0.8rem 2rem",
      }}
    >
      <span
        className="navbar-brand mb-0 h4 fw-bold"
        style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
      >
        ABC COMPANY – HR PORTAL
      </span>

      {role && (
        <button
          className="btn btn-gradient btn-sm"
          onClick={handleLogout}
          style={{
            background: "linear-gradient(to right, #43cea2, #185a9d)",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            padding: "5px 15px",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, { transform: "scale(1.05)", boxShadow: "0px 4px 15px rgba(0,0,0,0.3)" })
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, { transform: "scale(1)", boxShadow: "none" })
          }
        >
          Logout
        </button>
      )}
    </nav>
  );
}

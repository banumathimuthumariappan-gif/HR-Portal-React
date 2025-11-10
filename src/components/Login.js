import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import employees from "../data/employees.json";

export default function Login() {
  useEffect(() => {
    document.title = " ABC Company - Login"; // sets the tab title
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    const enteredEmail = email.trim().toLowerCase();

    // -------------------- HR LOGIN --------------------
    if (enteredEmail === "hr@abc.com" && password === "123") {
      localStorage.setItem("role", "HR");
      localStorage.removeItem("employee");
      window.location.href = "/hr";
      return;
    }

    // -------------------- EMPLOYEE LOGIN --------------------
    const registeredEmployees =
      JSON.parse(localStorage.getItem("registeredEmployees")) || [];

    const registeredUser = registeredEmployees.find(
      (emp) =>
        emp.email.trim().toLowerCase() === enteredEmail &&
        emp.password === password &&
        emp.onboarded
    );

    if (registeredUser) {
      localStorage.setItem("role", "Employee");
      localStorage.setItem("employee", JSON.stringify(registeredUser));
      window.location.href = "/employee";
      return;
    }

    const jsonUser = employees.find(
      (emp) =>
        emp.email.trim().toLowerCase() === enteredEmail &&
        emp.password === password
    );

    if (jsonUser) {
      localStorage.setItem("role", "Employee");
      localStorage.setItem("employee", JSON.stringify(jsonUser));
      window.location.href = "/employee";
      return;
    }

    alert("Invalid credentials or not onboarded yet!");
  };

  return (
    <div
      className="container w-50 mt-5 p-4 rounded-4 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #f093fb, #f5576c)",
        color: "#fff",
      }}
    >
      <h3
        className="text-center mb-4 fw-bold"
        style={{
          textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        Welcome Back!
      </h3>

      <p className="text-center mb-4">Please login to access your account</p>

      <form onSubmit={loginUser}>
        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            className="form-control border-0 shadow-sm rounded-3"
            style={{ backgroundColor: "#ffe3f1" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            className="form-control border-0 shadow-sm rounded-3"
            style={{ backgroundColor: "#ffe3f1" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-gradient w-100 fw-bold shadow"
          style={{
            background: "linear-gradient(90deg, #43e97b, #38f9d7)",
            color: "#fff",
            fontSize: "1.1rem",
            borderRadius: "12px",
          }}
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="fw-bold text-decoration-none"
          style={{ color: "#ffd700" }}
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

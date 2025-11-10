import { useState, useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    document.title = " ABC Company - Sign Up"; // sets the tab title
  }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const pending = JSON.parse(localStorage.getItem("pendingEmployees")) || [];

    // Avoid duplicates
    if (pending.find((emp) => emp.email === form.email)) {
      alert("An account with this email is already pending approval.");
      return;
    }

    pending.push(form);
    localStorage.setItem("pendingEmployees", JSON.stringify(pending));
    alert("✅ Registration submitted! Awaiting HR approval.");
    window.location.href = "/";
  };

  return (
    <div
      className="container w-50 mt-5 p-4 rounded-4 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "#fff",
      }}
    >
      <h3
        className="text-center mb-4 fw-bold"
        style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}
      >
        Employee Signup
      </h3>

      <p className="text-center mb-4">
        Fill in your details to create an account
      </p>

      <form onSubmit={handleSignup}>
        <input
          className="form-control my-2 border-0 shadow-sm rounded-3"
          style={{ backgroundColor: "#ffe3f1" }}
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-2 border-0 shadow-sm rounded-3"
          style={{ backgroundColor: "#ffe3f1" }}
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-2 border-0 shadow-sm rounded-3"
          style={{ backgroundColor: "#ffe3f1" }}
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-2 border-0 shadow-sm rounded-3"
          style={{ backgroundColor: "#ffe3f1" }}
          placeholder="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
        />
        <input
          className="form-control my-2 border-0 shadow-sm rounded-3"
          style={{ backgroundColor: "#ffe3f1" }}
          placeholder="Designation"
          name="designation"
          value={form.designation}
          onChange={handleChange}
        />
        <button
          className="btn w-100 fw-bold shadow mt-3"
          style={{
            background: "linear-gradient(90deg, #f7971e, #ffd200)",
            color: "#fff",
            fontSize: "1.1rem",
            borderRadius: "12px",
          }}
        >
          Signup
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a
          href="/"
          className="fw-bold text-decoration-none"
          style={{ color: "#ffdd59" }}
        >
          Login
        </a>
      </p>
    </div>
  );
}

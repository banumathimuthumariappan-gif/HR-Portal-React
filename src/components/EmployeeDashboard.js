import React, {useEffect} from "react";

export default function EmployeeDashboard() {
  useEffect(() => {
    document.title = " ABC Company - Employee Dashboard"; // sets the tab title
  }, []);
  const employee = JSON.parse(localStorage.getItem("employee"));
  const allRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

  if (!employee) {
    return (
      <div className="container mt-5 text-center">
        <h4 style={{ color: "#ff6f61" }}>
          No employee information found. Please log in again.
        </h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => (window.location.href = "/")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const employeeLeaves = allRequests.filter(
    (req) => req.employeeEmail === employee.email
  );

  return (
    <div className="container mt-4">
      <h2 style={{ color: "#4a148c" }}>
        Welcome, <span style={{ color: "#ff6f00" }}>{employee.name}</span> 👋
      </h2>

      {/* ================= Employee Information Card ================= */}
      <div
        className="card mt-3 shadow-lg p-3"
        style={{
          background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
          color: "#fff",
        }}
      >
        <div className="card-body">
          <h5
            className="card-title mb-3"
            style={{ textShadow: "1px 1px 2px #000" }}
          >
            Employee Information
          </h5>
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Department:</strong> {employee.department}
          </p>
          <p>
            <strong>Designation:</strong> {employee.designation}
          </p>
          <p>
            <strong>Phone:</strong> {employee.phone}
          </p>
          <p>
            <strong>Joining Date:</strong> {employee.joiningDate}
          </p>
        </div>
      </div>

      {/* ================= Leave Details Table ================= */}
      <div
        className="card mt-4 shadow-lg p-3"
        style={{ background: "linear-gradient(135deg, #a8edea, #fed6e3)" }}
      >
        <div className="card-body">
          <h5
            className="card-title mb-3"
            style={{ color: "#c2185b", fontWeight: "bold" }}
          >
            Leave Details
          </h5>

          {employeeLeaves.length === 0 ? (
            <div className="text-center">
              <p style={{ color: "#6a1b9a" }}>
                No leave requests submitted yet.
              </p>
              <button
                className="btn btn-success"
                style={{
                  background: "linear-gradient(to right, #43cea2, #185a9d)",
                  border: "none",
                }}
                onClick={() => (window.location.href = "/leave")}
              >
                Request Leave
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover align-middle"
                style={{ background: "#fff", borderRadius: "8px" }}
              >
                <thead className="table-light">
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>Requested On</th>
                    <th>Status</th>
                    <th>Employee Comment</th>
                    <th>HR Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {[...employeeLeaves].reverse().map((req, index) => (
                    <tr key={index}>
                      <td>{req.fromDate}</td>
                      <td>{req.toDate}</td>
                      <td>{req.daysRequested}</td>
                      <td>{req.requestDate}</td>
                      <td>
                        <span
                          className={`badge ${
                            req.status === "Approved"
                              ? "bg-success"
                              : req.status === "Rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                          style={{ fontWeight: "bold" }}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>{req.empComment || <em>No comment</em>}</td>
                      <td>{req.hrComment || <em>–</em>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ================= Action Button ================= */}
      <div className="mt-3 text-center">
        <button
          className="btn"
          style={{
            background: "linear-gradient(to right, #f7971e, #ffd200)",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
          }}
          onClick={() => (window.location.href = "/leave")}
        >
          Request New Leave
        </button>
      </div>
    </div>
  );
}

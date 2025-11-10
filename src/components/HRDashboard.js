import React, { useEffect, useState } from "react";
import employeesData from "../data/employees.json";

export default function HRDashboard() {
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [onboardForm, setOnboardForm] = useState({});
  const [onboardMode, setOnboardMode] = useState(null);

  useEffect(() => {
    document.title = "ABC Company - HR Dashboard"; // sets the tab title
    const storedPending =
      JSON.parse(localStorage.getItem("pendingEmployees")) || [];
    setPendingEmployees(storedPending);

    let storedRegistered = JSON.parse(
      localStorage.getItem("registeredEmployees")
    );
    if (!storedRegistered || storedRegistered.length === 0) {
      storedRegistered = employeesData;
      localStorage.setItem(
        "registeredEmployees",
        JSON.stringify(storedRegistered)
      );
    }
    setEmployees(storedRegistered);

    const storedLeaves =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(storedLeaves);
  }, []);

  const approveEmployee = (emp) => {
    setOnboardMode(emp.email);
    setOnboardForm({
      ...emp,
      employeeId: `EMP${Math.floor(Math.random() * 10000)}`,
      manager: "",
      joiningDate: "",
      onboarded: false,
    });
  };

  const rejectEmployee = (emp) => {
    const updatedPending = pendingEmployees.filter(
      (p) => p.email !== emp.email
    );
    localStorage.setItem("pendingEmployees", JSON.stringify(updatedPending));
    setPendingEmployees(updatedPending);
    alert(`${emp.name} has been rejected.`);
  };

  const handleOnboardChange = (e) => {
    setOnboardForm({ ...onboardForm, [e.target.name]: e.target.value });
  };

  const completeOnboarding = () => {
    const updatedEmp = {
      ...onboardForm,
      onboarded: true,
      password: onboardForm.password || "default123",
    };
    let registered =
      JSON.parse(localStorage.getItem("registeredEmployees")) || [];
    const exists = registered.find((emp) => emp.email === updatedEmp.email);
    if (exists) {
      registered = registered.map((emp) =>
        emp.email === updatedEmp.email ? updatedEmp : emp
      );
    } else {
      registered.push(updatedEmp);
    }
    localStorage.setItem("registeredEmployees", JSON.stringify(registered));

    const updatedPending = pendingEmployees.filter(
      (p) => p.email !== updatedEmp.email
    );
    localStorage.setItem("pendingEmployees", JSON.stringify(updatedPending));
    setPendingEmployees(updatedPending);

    setEmployees(registered);
    setOnboardMode(null);
    setOnboardForm({});
    alert(`${updatedEmp.name} has been onboarded successfully!`);
  };

  const updateLeaveStatus = (id, status, hrComment = "") => {
    const updated = leaveRequests.map((req) =>
      req.id === id ? { ...req, status, hrComment } : req
    );
    setLeaveRequests(updated);
    localStorage.setItem("leaveRequests", JSON.stringify(updated));
  };

  const handleLeaveAction = (id, status) => {
    const hrComment =
      prompt(`Enter HR comment for ${status.toLowerCase()}ing this request:`) ||
      "";
    updateLeaveStatus(id, status, hrComment);
  };

  return (
    <div className="container mt-4">
      <h3
        className="text-center mb-4"
        style={{ color: "#6a11cb", textShadow: "2px 2px 4px #ffdd59" }}
      >
        HR Dashboard
      </h3>

      {/* ================= Pending Employees ================= */}
      <div className="mb-4">
        <h5 style={{ color: "#ff6f61" }}>Pending Employee Approvals</h5>
        {onboardMode ? (
          <div
            className="p-3 mb-3 shadow rounded"
            style={{ background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" }}
          >
            <h6 className="fw-bold">{onboardForm.name}</h6>
            <div className="row">
              <div className="col-md-6">
                <input
                  className="form-control my-2"
                  placeholder="Department"
                  name="department"
                  value={onboardForm.department}
                  onChange={handleOnboardChange}
                />
                <input
                  className="form-control my-2"
                  placeholder="Designation"
                  name="designation"
                  value={onboardForm.designation}
                  onChange={handleOnboardChange}
                />
                <input
                  type="date"
                  className="form-control my-2"
                  name="joiningDate"
                  value={onboardForm.joiningDate}
                  onChange={handleOnboardChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  className="form-control my-2"
                  placeholder="Phone"
                  name="phone"
                  value={onboardForm.phone}
                  onChange={handleOnboardChange}
                />
                <input
                  className="form-control my-2"
                  placeholder="Manager"
                  name="manager"
                  value={onboardForm.manager}
                  onChange={handleOnboardChange}
                />
                <input
                  className="form-control my-2"
                  placeholder="Employee ID"
                  name="employeeId"
                  value={onboardForm.employeeId}
                  disabled
                />
              </div>
            </div>
            <button
              className="btn btn-success me-2 mt-2"
              onClick={completeOnboarding}
            >
              Complete Onboarding
            </button>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setOnboardMode(null)}
            >
              Cancel
            </button>
          </div>
        ) : pendingEmployees.length === 0 ? (
          <p>No pending approvals.</p>
        ) : (
          <div className="row">
            {pendingEmployees.map((emp) => (
              <div className="col-md-4 mb-3" key={emp.email}>
                <div
                  className="card shadow-sm p-3 h-100"
                  style={{
                    background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
                    color: "#333",
                  }}
                >
                  <h6 className="fw-bold">{emp.name}</h6>
                  <p>
                    <strong>Email:</strong> {emp.email}
                  </p>
                  <p>
                    <strong>Department:</strong> {emp.department}
                  </p>
                  <p>
                    <strong>Designation:</strong> {emp.designation}
                  </p>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => approveEmployee(emp)}
                  >
                    Approve & Onboard
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => rejectEmployee(emp)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= Onboarded Employees ================= */}
      <div className="mb-4">
        <h5 style={{ color: "#6a11cb" }}>Employees</h5>
        {employees.length === 0 ? (
          <p>No employees onboarded yet.</p>
        ) : (
          <div className="row">
            {employees.map((emp, index) => (
              <div className="col-md-4 mb-3" key={emp.email}>
                <div
                  className="card shadow-sm p-3 h-100"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(135deg, #ffd8d8, #ffe7d8)" // pastel pink-orange
                        : "linear-gradient(135deg, #d8f0ff, #d8ffe7)", // pastel blue-green
                    color: "#333",
                    borderRadius: "12px",
                  }}
                >
                  <h6 className="fw-bold">{emp.name}</h6>
                  <p>
                    <strong>Email:</strong> {emp.email}
                  </p>
                  <p>
                    <strong>Department:</strong> {emp.department}
                  </p>
                  <p>
                    <strong>Designation:</strong> {emp.designation}
                  </p>
                  <button
                    className="btn btn-outline-primary w-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)", // clear button look
                      color: "#6a11cb",
                      fontWeight: "600",
                      border: "2px solid #6a11cb",
                      borderRadius: "8px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#6a11cb";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.7)";
                      e.currentTarget.style.color = "#6a11cb";
                    }}
                    onClick={() => {
                      localStorage.setItem("viewEmployee", JSON.stringify(emp));
                      window.location.href = "/employee-details";
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= Leave Requests ================= */}
      <div className="mb-4">
        <h5 style={{ color: "#ff6f61" }}>Leave Requests</h5>
        {leaveRequests.length === 0 ? (
          <p>No leave requests available.</p>
        ) : (
          <div className="table-responsive">
            <table
              className="table align-middle table-hover text-center"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <thead
                style={{
                  background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
                  color: "#fff",
                }}
              >
                <tr>
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Requested On</th>
                  <th>Status</th>
                  <th>Employee Comment</th>
                  <th>HR Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...leaveRequests].reverse().map((req, index) => (
                  <tr
                    key={req.id}
                    style={{
                      background: index % 2 === 0 ? "#fef9f9" : "#f0f8ff",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#ffeaa7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        index % 2 === 0 ? "#fef9f9" : "#f0f8ff")
                    }
                  >
                    <td>{req.employeeName}</td>
                    <td>{req.employeeEmail}</td>
                    <td>{req.fromDate}</td>
                    <td>{req.toDate}</td>
                    <td>{req.daysRequested}</td>
                    <td>{req.requestDate}</td>
                    <td>
                      <span
                        className={`badge fw-bold`}
                        style={{
                          background:
                            req.status === "Approved"
                              ? "#55efc4"
                              : req.status === "Rejected"
                              ? "#ff7675"
                              : "#ffeaa7",
                          color: req.status === "Pending" ? "#2d3436" : "#fff",
                          padding: "5px 10px",
                          borderRadius: "12px",
                        }}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>{req.empComment || "—"}</td>
                    <td>{req.hrComment || "—"}</td>
                    <td>
                      {req.status === "Pending" ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            style={{ background: "#00b894", border: "none" }}
                            onClick={() =>
                              handleLeaveAction(req.id, "Approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ background: "#d63031", border: "none" }}
                            onClick={() =>
                              handleLeaveAction(req.id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-secondary btn-sm" disabled>
                          {req.status}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

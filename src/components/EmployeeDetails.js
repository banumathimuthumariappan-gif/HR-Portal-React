import { useEffect, useState } from "react";

export default function EmployeeDetails() {
  useEffect(() => {
    document.title = " ABC Company - Employee Detail"; // sets the tab title
  }, []);
  const [employee, setEmployee] = useState(null);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const empData = JSON.parse(localStorage.getItem("viewEmployee"));
    if (empData) {
      setEmployee(empData);
      setForm(empData);
    }

    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    if (empData) {
      const empLeaves = allLeaves.filter(
        (req) => req.employeeEmail === empData.email
      );
      setLeaveRecords(empLeaves);
    }
  }, []);

  if (!employee) {
    return (
      <div className="container mt-5 text-center">
        <h4 style={{ color: "#ff6f61" }}>No employee selected.</h4>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => (window.location.href = "/hr")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const totalLeaves = 20;
  const leavesTaken = leaveRecords
    .filter((r) => r.status === "Approved")
    .reduce((sum, r) => sum + r.daysRequested, 0);
  const remainingLeaves = totalLeaves - leavesTaken;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    let registered =
      JSON.parse(localStorage.getItem("registeredEmployees")) || [];
    const exists = registered.find((emp) => emp.email === employee.email);

    if (exists) {
      registered = registered.map((emp) =>
        emp.email === employee.email ? { ...emp, ...form } : emp
      );
    } else {
      registered.push(form);
    }

    localStorage.setItem("registeredEmployees", JSON.stringify(registered));
    setEmployee(form);
    localStorage.setItem("viewEmployee", JSON.stringify(form));
    setEditMode(false);
    alert("Employee details updated successfully!");
  };

  return (
    <div className="container mt-5">
      {/* Employee Info Card */}
      <div
        className="card shadow-sm p-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
          color: "#333",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ color: "#00796b", textShadow: "1px 1px 2px #b2dfdb" }}>
            Employee: {employee.name}
          </h3>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Email:</strong>{" "}
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  disabled
                />
              ) : (
                employee.email
              )}
            </p>
            <p>
              <strong>Department:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="department"
                  className="form-control"
                  value={form.department || ""}
                  onChange={handleChange}
                />
              ) : (
                employee.department
              )}
            </p>
            <p>
              <strong>Designation:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={form.designation || ""}
                  onChange={handleChange}
                />
              ) : (
                employee.designation
              )}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={form.phone || ""}
                  onChange={handleChange}
                />
              ) : (
                employee.phone
              )}
            </p>
          </div>

          <div className="col-md-6">
            <p>
              <strong>Joining Date:</strong>{" "}
              {editMode ? (
                <input
                  type="date"
                  name="joiningDate"
                  className="form-control"
                  value={form.joiningDate || ""}
                  onChange={handleChange}
                />
              ) : (
                employee.joiningDate
              )}
            </p>
            <p>
              <strong>Manager:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="manager"
                  className="form-control"
                  value={form.manager || ""}
                  onChange={handleChange}
                />
              ) : (
                employee.manager || "—"
              )}
            </p>
            <p>
              <strong>Employee ID:</strong> {employee.employeeId || "—"}
            </p>
            <p>
              <strong>Onboarded:</strong>{" "}
              <span
                style={{
                  color: employee.onboarded ? "#4caf50" : "#f44336",
                  fontWeight: "bold",
                }}
              >
                {employee.onboarded ? "✅" : "❌"}
              </span>
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={form.address || ""}
                  onChange={handleChange}
                />
              ) : (
                employee.address || "—"
              )}
            </p>
          </div>
        </div>

        {editMode && (
          <div className="text-center mt-3">
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setForm(employee);
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Leave Summary */}
      <div
        className="card shadow-sm p-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #fff3e0, #ffffff)",
          color: "#333",
        }}
      >
        <h5 className="mb-3" style={{ color: "#ff9800", fontWeight: "bold" }}>
          Leave Summary
        </h5>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h6>Total Leaves</h6>
              <p className="fw-bold">{totalLeaves}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h6>Leaves Taken</h6>
              <p className="fw-bold text-success">{leavesTaken}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h6>Remaining Leaves</h6>
              <p className="fw-bold text-primary">{remainingLeaves}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave History */}
      <div
        className="card shadow-sm p-4 mb-4"
        style={{ background: "linear-gradient(135deg, #fce4ec, #ffffff)" }}
      >
        <h5 className="mb-3" style={{ color: "#e91e63", fontWeight: "bold" }}>
          Leave Details
        </h5>
        {leaveRecords.length === 0 ? (
          <p>No leave records found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle table-hover">
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
                {[...leaveRecords].reverse().map((req) => (
                  <tr key={req.id}>
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
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>{req.empComment || "—"}</td>
                    <td>{req.hrComment || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => (window.location.href = "/hr")}
        >
          ← Back to HR Dashboard
        </button>
      </div>
    </div>
  );
}

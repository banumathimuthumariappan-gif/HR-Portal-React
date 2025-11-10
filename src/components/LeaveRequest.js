import React, { useState, useEffect } from "react";

export default function LeaveRequest() {
  const employee = JSON.parse(localStorage.getItem("employee"));

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [empComment, setEmpComment] = useState("");
  const [error, setError] = useState("");
  const [leaveSummary, setLeaveSummary] = useState({
    totalLeaves: 20,
    leavesTaken: 0,
    remainingLeaves: 20,
  });

  useEffect(() => {
    document.title = " ABC Company - Leave Request"; // sets the tab title

    if (!employee) return;

    const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const empLeaves = allLeaves.filter(
      (req) => req.employeeEmail === employee.email && req.status === "Approved"
    );

    const leavesTaken = empLeaves.reduce((sum, r) => sum + r.daysRequested, 0);
    const remainingLeaves = 20 - leavesTaken;

    setLeaveSummary({
      totalLeaves: 20,
      leavesTaken,
      remainingLeaves,
    });
  }, [employee]);

  if (!employee) {
    return (
      <div className="container mt-5 text-center">
        <h4 style={{ color: "#ff6f61" }}>
          No employee session found. Please log in again.
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate) {
      setError("Please select both From and To dates.");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (to < from) {
      setError("End date must be after start date.");
      return;
    }

    const daysRequested = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    if (daysRequested > leaveSummary.remainingLeaves) {
      setError(
        `You cannot request more than your remaining leaves (${leaveSummary.remainingLeaves}).`
      );
      return;
    }

    const newRequest = {
      id: Date.now(),
      employeeName: employee.name,
      employeeEmail: employee.email,
      fromDate,
      toDate,
      daysRequested,
      requestDate: new Date().toLocaleDateString(),
      status: "Pending",
      empComment,
      hrComment: "",
    };

    const existingRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const updatedRequests = [...existingRequests, newRequest];
    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));

    alert("✅ Leave request submitted successfully!");
    window.location.href = "/employee";
  };

  return (
    <div className="container mt-4">
      <div
        className="card shadow-lg p-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
          color: "#4a148c",
        }}
      >
        <h3
          className="mb-4 text-center"
          style={{ textShadow: "1px 1px 3px #000" }}
        >
          Leave Request Form
        </h3>

        {/* 🔹 Leave Summary */}
        <div className="row text-center mb-4">
          <div className="col-md-4">
            <div
              className="p-3 rounded shadow-sm"
              style={{
                background: "linear-gradient(to right, #42e695, #3bb2b8)",
                color: "#fff",
              }}
            >
              <h6>Total Leaves</h6>
              <p className="fw-bold">{leaveSummary.totalLeaves}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="p-3 rounded shadow-sm"
              style={{
                background: "linear-gradient(to right, #f7971e, #ffd200)",
                color: "#fff",
              }}
            >
              <h6>Leaves Taken</h6>
              <p className="fw-bold">{leaveSummary.leavesTaken}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="p-3 rounded shadow-sm"
              style={{
                background: "linear-gradient(to right, #00c6ff, #0072ff)",
                color: "#fff",
              }}
            >
              <h6>Remaining Leaves</h6>
              <p className="fw-bold">{leaveSummary.remainingLeaves}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div
              className="alert"
              style={{
                background: "#ff6f61",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">From Date</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">To Date</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Employee Comment</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Reason for leave or notes..."
              value={empComment}
              onChange={(e) => setEmpComment(e.target.value)}
            ></textarea>
          </div>

          <div className="text-center">
            <button
              className="btn"
              style={{
                background: "linear-gradient(to right, #ff512f, #dd2476)",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px 25px",
                borderRadius: "8px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
              }}
              type="submit"
            >
              Submit Leave Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

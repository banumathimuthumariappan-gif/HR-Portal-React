import { useState } from "react";

export default function HROnboarding() {
  const [step, setStep] = useState(1);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
  });

  // ✅ Save employee to localStorage
  const handleFinish = () => {
    const existing =
      JSON.parse(localStorage.getItem("registeredEmployees")) || [];
    existing.push(employee);
    localStorage.setItem("registeredEmployees", JSON.stringify(existing));

    alert(`✅ ${employee.name} successfully onboarded!`);
    window.location.href = "/hr";
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">HR Onboarding Process</h3>

      <div className="card shadow-sm p-4">
        {step === 1 && (
          <>
            <h5>Step 1: Basic Information</h5>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-primary"
                onClick={() => setStep(2)}
                disabled={!employee.name || !employee.email || !employee.password}
              >
                Next →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h5>Step 2: Job Information</h5>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Joining Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep(3)}
                disabled={
                  !employee.department ||
                  !employee.designation ||
                  !employee.joiningDate
                }
              >
                Next →
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h5>Step 3: Review & Confirm</h5>
            <div className="mt-3">
              <p>
                <strong>Name:</strong> {employee.name}
              </p>
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
              <p>
                <strong>Phone:</strong> {employee.phone}
              </p>
              <p>
                <strong>Department:</strong> {employee.department}
              </p>
              <p>
                <strong>Designation:</strong> {employee.designation}
              </p>
              <p>
                <strong>Joining Date:</strong> {employee.joiningDate}
              </p>
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button className="btn btn-success" onClick={handleFinish}>
                ✅ Finish Onboarding
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

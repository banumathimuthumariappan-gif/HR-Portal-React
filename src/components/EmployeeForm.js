import { useState } from "react";

export default function EmployeeForm() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const save = (e) => {
    e.preventDefault();
    alert("Employee Registered!");
  }

  return (
    <div className="container mt-4 w-50">
      <h3>Add Employee</h3>
      <form onSubmit={save}>
        <input className="form-control my-2" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="form-control my-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

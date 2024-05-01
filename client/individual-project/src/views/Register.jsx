import React, { useState } from "react";
import cocUrl from "../utils/axios";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cocUrl.post("/register", { email, password });
      console.log("Registrasi berhasil:", response.data);
    } catch (error) {
      console.log("Registrasi gagal:", error.response.data);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="exampleInputEmail1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
            id="exampleInputEmail1"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="exampleInputPassword1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
            id="exampleInputPassword1"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

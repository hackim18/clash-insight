import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import cocUrl from "../utils/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log({ email, password });

  const handleCredentialResponse = async ({ credential }) => {
    // console.log("Encoded JWT ID token: ", response);
    const { data } = await cocUrl.post("/google-login", {
      googleToken: credential,
    });
    console.log(data);

    localStorage.setItem("access_token", data.access_token);
    navigate("/");
  };

  useEffect(() => {
    // function handleCredentialResponse(response) {
    //   console.log("Encoded JWT ID token: " + response.credential);
    // }
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "311311491871-asdh36mkpe95qjvlvm7frf04ngktqrjf.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const { data } = await cocUrl.post("/login", { email, password });
            localStorage.setItem("access_token", data.access_token);
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Login Successful",
              text: "You have successfully logged in!",
            });
            navigate("/");
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid email or password!",
            });
          }
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="exampleInputEmail1" style={{ display: "block" }}>
            Email address
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            style={{ width: "100%", padding: "5px" }}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div style={{ fontSize: "small" }}>We'll never share your email with anyone else.</div>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="exampleInputPassword1" style={{ display: "block" }}>
            Password
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            style={{ width: "100%", padding: "5px" }}
            id="exampleInputPassword1"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Link to={"/register"} style={{ textDecoration: "none" }}>
            Register
          </Link>
        </div>
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
          Submit
        </button>
      </form>
      <div id="buttonDiv"></div>
    </div>
  );
}

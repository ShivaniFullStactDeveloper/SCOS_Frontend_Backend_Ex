import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
// import { users } from "../../data/UserData";
import Logo from "../../assets/images/black-logo.png";
import { FooterLogin } from "../../components/Footer/Footer";

// Moon Icon
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

// Light Icon
const LightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="white"><path d="M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-226.5 56.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" /></svg>
);


// AlertIcon (UNCHANGED)
const AlertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);


export default function Login() {
  // navigation
  const navigate = useNavigate();

  // state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dark Mode
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme on load and when toggled
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");

    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");

      if (favicon) favicon.href = "/white-logo.png";
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");

      if (favicon) favicon.href = "/black-logo.png";
    }
  }, [dark]);

  // CORRECT ROUTING LOGIC
  const handleRouting = (user) => {

    // No institute
    if (!user.institutes || user.institutes.length === 0) {
      setError("No institute assigned.");
      return;
    }

    // save user
    localStorage.setItem("user", JSON.stringify(user));

    // Multiple institutes → Institute page
    if (user.institutes.length > 1) {
      localStorage.setItem("institutes", JSON.stringify(user.institutes));
      navigate("/institutes");
      return;
    }

    const institute = user.institutes[0];

    // No roles
    if (!institute.roles || institute.roles.length === 0) {
      setError("No roles assigned to this institute");
      return;
    }

    // save institute
    localStorage.setItem("selectedInstitute", JSON.stringify(institute));

    //  Multiple roles → Role page
    if (institute.roles.length > 1) {
      navigate("/roles");
      return;
    }

    //  Single role → Dashboard
    localStorage.setItem("selectedRole", JSON.stringify(institute.roles[0]));
    navigate("/dashboard");
  };

  //  LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Enter username & password");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
      setError("Enter valid email");
      return;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError("Invalid password");
      return;
    }

    try {
      // LOGIN API
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      //  Store token
      localStorage.setItem("preToken", data.pre_context_token);

      //  MAPPING API
      const mapRes = await fetch(
        "http://localhost:3000/api/auth/my-institutes-roles",
        {
          headers: {
            Authorization: `Bearer ${data.pre_context_token}`
          }
        }
      );

      const mapData = await mapRes.json();

      if (!mapData.success) {
        setError("Mapping failed");
        return;
      }

      const mappings = mapData.data;

      // CONVERT API DATA → USER FORMAT (GROUPING ROLES UNDER INSTITUTES)                                   
      const instituteMap = {};

      mappings.forEach((item) => {
        if (!instituteMap[item.institute_id]) {
          instituteMap[item.institute_id] = {
            institute_id: item.institute_id,
            institute_name: item.institute_name,
            location: item.location,
            type: item.type,
            logo: item.logo,
            roles: []
          };
        }

        instituteMap[item.institute_id].roles.push({
          role_id: item.role_id,
          role_name: item.role_name,
          desc: item.description,
          icon: item.icon
        });
      });

      const institutes = Object.values(instituteMap);

      //  CREATE USER OBJECT
      const userObj = {
        email: username,
        full_name:
          data.user?.full_name ||
          data.user?.name ||
          data.user?.email ||
          username,
        institutes: institutes
      };


      //  CALL SAME OLD FUNCTION
      handleRouting(userObj);

    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  };

  return (
    <div className="page-wrapper">
      {/* Top Icons */}
      <div className="top-right-icons">
        <button className="icon-btn">
          <AlertIcon />
        </button>

        <button
          className="icon-btn"
          onClick={() => setDark(prev => !prev)}
        >
          {dark ? <LightIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <div className="card-logo">
          <img src={Logo} className="logo-img" alt="logo" />
        </div>

        <h1 className="card-title">SchoolCoreOS</h1>

        <form className="card-form" onSubmit={handleLogin}>
          <Input
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error msg show */}
          {error && <p className="error-msg">{error}</p>}

          {/* Continue button */}
          <button className="continue-btn" type="submit">
            Continue
          </button>
        </form>
      </div>
      {/* Footer */}
      <FooterLogin />
    </div>
  );
}
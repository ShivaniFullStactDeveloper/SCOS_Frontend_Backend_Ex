import React, { useEffect } from "react";
import "../../styles/DashboardPage.css";
import Header from "../../components/Headers/Header";
import { useNavigate } from "react-router-dom";
import { FooterRole } from "../../components/Footer/Footer";

export default function Dashboard() {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  //  LOGOUT FUNCTION (Backend + Frontend)
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access_token");

      //  Backend API call
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      //  Frontend cleanup
      const theme = localStorage.getItem("theme"); // save theme
      localStorage.clear(); // clear all data
      localStorage.setItem("theme", theme); // restore theme

      navigate("/"); // redirect to login
    }
  };

  // DARK MODE APPLY
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <Header
        user={user}
        showLogout={true}
        onLogout={handleLogout}
        fullWidth={true}
      />

      {/* TITLE */}
      <div className="dashboard-title">
        <h2>Hi {user?.full_name} 👋</h2>
        <h4>Access your personalized dashboard</h4>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="dashboard-grid">

        {/* Card 1 */}
        <div className="dash-card blue">
          <h2>08</h2>
          <h4>Active Institutes</h4>
          <p>
            Institutes actively operating and using the platform for daily management
          </p>
        </div>

        {/* Card 2 */}
        <div className="dash-card green">
          <h2>05</h2>
          <h4>Inactive Institutes</h4>
          <p>
            Institutes currently inactive and not participating in system operations
          </p>
        </div>

        {/* Card 3 */}
        <div className="dash-card yellow">
          <h2>15+</h2>
          <h4>Total Modules</h4>
          <p>
            Complete set of features enabling academic and administrative workflows
          </p>
        </div>

        {/* Card 4 */}
        <div className="dash-card purple">
          <h2>50+</h2>
          <h4>Total Users</h4>
          <p>
            All registered users across institutes using the platform services
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <FooterRole />
    </div>
  );
}
import React, { useState, useEffect } from "react";
import "../../styles/Institute.css";
import Header from "../../components/Headers/Header";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Search_bar/SearchBar";
import { FooterRole } from "../../components/Footer/Footer";

export default function InstitutePage() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // state for institutes
  const [institutes, setInstitutes] = useState([]);

  // search state
  const [search, setSearch] = useState("");

  // FETCH FROM BACKEND
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const token = localStorage.getItem("preToken");

        const res = await fetch(
          "http://localhost:3000/api/auth/my-institutes-roles",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!data.success) return;

        const mappings = data.data;

        // GROUP DATA BY INSTITUTE
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

        setInstitutes(Object.values(instituteMap));

      } catch (err) {
        console.log(err);
      }
    };

    fetchInstitutes();
  }, []);

  // FILTER LOGIC
  const filteredInstitutes = institutes.filter((item) =>
    (item.institute_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // DARK THEME
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <div className="institute-container">

      {/* HEADER */}
      <Header user={user} />

      {/* TITLE */}
      <div className="title-section">
        <h2>Hi, {user?.full_name || user?.name} 👋</h2>
        <p>Select your institute to access your personalized dashboard</p>
      </div>

      {/* SEARCH */}
      {institutes.length > 5 && (
        <SearchBar value={search} onChange={setSearch} />
      )}

      {/* LIST */}
      <div className="institute-list">
        {filteredInstitutes.map((item, index) => (
          <div
            className="institute-card"
            key={index}
            onClick={() => {
              localStorage.setItem("selectedInstitute", JSON.stringify(item));

              if (item.roles.length === 1) {
                localStorage.setItem("selectedRole", JSON.stringify(item.roles[0]));
                navigate("/dashboard");
              } else {
                navigate("/roles");
              }
            }}
          >
            <div className="left">
              <img src={`http://localhost:3000${item.logo}`} alt="" />
              <div>
                <h4>{item.institute_name}</h4>

                <div className="location">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#929292">
                    <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                  </svg>

                  <p>{item.location}</p>
                </div>
              </div>
            </div>

            <div className="right">
              <span className="type">{item.type}</span>

              <button className="arrow-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.71087 16.707L15.4179 11L9.71087 5.29297L8.29688 6.70697L12.5899 11L8.29688 15.293L9.71087 16.707Z" fill="#07305D" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <FooterRole />

    </div>
  );
}
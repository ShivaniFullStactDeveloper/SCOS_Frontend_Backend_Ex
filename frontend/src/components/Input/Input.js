import React, { useState } from "react";
import "../../styles/common_comp_style/Input.css";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  // state for show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // check if this input is password type
  const isPassword = type === "password";

  return (
    // Wrapper (important for positioning eye icon)
    <div className="input-wrapper">

      {/* Input Field */}
      <input
        // If password → toggle between text & password
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />

      {/* Show Eye Icon only for password field */}
      {isPassword && (
        <span
          className="eye-icon"

          // Toggle show/hide password on click
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            // password visible
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#929292"
            >
              <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5Z" />
            </svg>
          ) : (
            // password hidden
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#929292"
            >
              <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56Z" />
            </svg>
          )}
        </span>
      )}
    </div>
  );
}
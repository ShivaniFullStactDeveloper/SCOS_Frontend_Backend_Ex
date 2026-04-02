import React, {useEffect} from "react";
import AppRoutes from "./routes/AppRoutes";
import "./styles/DarkTheme.css";

export default function App() {
// DARK THEME
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return <AppRoutes/>;
}

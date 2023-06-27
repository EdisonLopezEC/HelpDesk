import { useTheme } from "@emotion/react";
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { styles } from "./styles/YearSelector.module.css";
const YearSelector = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedYear") || currentYear - 10
  );
  const years = Array.from(
    { length: 3 },
    (_, index) => currentYear - 2 + index
  );

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    localStorage.setItem("selectedYear", year);
    window.location.reload(); // Recargar la página
  };

  useEffect(() => {
    if (!localStorage.getItem("selectedYear")) {
      setSelectedYear(currentYear);
      localStorage.setItem("selectedYear", currentYear);
    }
  }, []);

  return (
    <div className="year-selector">
      <label htmlFor="year-select">{`Selecciona un año: `}</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
        style={{
          borderRadius: "10px",
          padding: "3px",
          fontSize: "16px",
          backgroundColor: "#f2f2f2",
          color: "#333",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          border: "none",
          outline: "none",
          transition: "box-shadow 0.3s ease",
          cursor: "pointer",
          "@media (max-width: 600px)": {
            width: "80%",
          },
        }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;

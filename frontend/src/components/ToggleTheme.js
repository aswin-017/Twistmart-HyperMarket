// src/components/ToggleTheme.js
import React from 'react';
import { useTheme } from './contexts/ThemeContext'; // Adjust the path as needed
import '../assets/css/ToggleTheme.css'; // Ensure the path is correct

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = (event) => {
    const newTheme = event.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <label className="ui-switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={handleToggle}
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
};

export default ToggleTheme;

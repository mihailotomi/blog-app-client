import React from "react";

const Button = ({ label, onClick, color }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={color ? { backgroundColor: color } : {}}
    >
      <p>{label}</p>
    </button>
  );
};

export default Button;

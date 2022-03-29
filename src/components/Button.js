import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      <p>{label}</p>
    </button>
  );
};

export default Button;

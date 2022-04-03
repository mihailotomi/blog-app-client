import React, { useState, useRef, useEffect } from "react";

import classes from "../styles/Dropdown.module.scss";

//generic Dropdown component
//it gets the state from the parent, along with all the options and the state setter function
const Dropdown = ({ options, setSelectedOption, selectedOption }) => {
  ////options are an array of key-value pairs, we need the keys for the UI
  const optionNames = Object.keys(options);

  ////the dropdawn inner state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const closeDropdown = (event) => {
      ////if you click enywhere outside the dropdown while it's open, it should close
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return;
      }
      setIsOpen(false);
    };
    document.body.addEventListener("click", closeDropdown);

    ////cleanup function
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

  //turn the list of options into jsx blocks if the dropdown is open
  const renderOptions = () => {
    if (isOpen) {
      return optionNames.map((optionName) => {
        ////the currently selected option will already be displayed
        if (optionName != selectedOption) {
          return (
            <div
              className={`${classes["dropdown-option"]}`}
              key={optionName}
              onClick={() => {
                setSelectedOption(optionName);
              }}
            >
              {optionName}
            </div>
          );
        }
        return <span key={optionName} style={{ display: "none" }}></span>;
      });
    }
    return <span style={{ display: "none" }}></span>;
  };

  const renderDropdownArrow = () => {
    return (
      <svg
        className={`${classes.svg} ${isOpen ? classes.open : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 48 48"
        width="24"
      >
        <path d="M14 20l10 10 10-10z" />
        <path d="M0 0h48v48h-48z" fill="none" />
      </svg>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={`${classes.dropdown} ${isOpen ? classes.open : ""}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      style={isOpen ? { height: "auto" } : { height: "1.5rem" }}
    >
      <div className={`${classes["dropdown-option"]}`}>
        {" "}
        {selectedOption} {renderDropdownArrow()}
      </div>
      {renderOptions()}
    </div>
  );
};

export default Dropdown;

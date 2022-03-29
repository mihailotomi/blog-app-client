import React from "react";

import Logo from "./Logo";
import Navbar from "./Navbar";

import classes from "../../styles/Header/Header.module.scss";

const Header = () => {
  return (
    <header className={`${classes.header} container`}>
      <Logo name={"Moj blog"} />
      <Navbar />
    </header>
  );
};

export default Header;

//dependencies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//styling
import classes from "../../styles/Header/Header.module.scss";

//components
import GoogleAuth from "../GoogleAuth";

const Navbar = ({ auth }) => {
  //state to determine if the responsive menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  //&determine the viewport at each moment
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  //&

  //list of elements to render in the navbar
  const navElements = auth.isSignedIn
    ? [
        { label: "Pocetna", path: "/" },
        { label: "Nova objava", path: "/posts/new" },
        { label: "Kontakt", path: "/" },
        { label: "O nama", path: "/" },
      ]
    : [
        { label: "Pocetna", path: "/" },
        { label: "Kontakt", path: "/" },
        { label: "O nama", path: "/" },
      ];

  //render nav elements as Links responsively
  const renderNavElementes = (elements) => {
    ////display for mobile and tablet
    if (windowWidth < 900) {
      return (
        <React.Fragment>
          {
            ////the hamburger menu icon
          }
          <div
            className={`${classes.hamburger} ${menuOpen ? classes.open : ""}`}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <span></span>
            <span style={{ position: "relative", top: "0.6rem" }}></span>
            <span style={{ position: "relative", top: "1.2rem" }}></span>
          </div>
          {
            ////the menu itself
          }
          <menu className={`${classes.menu} ${menuOpen ? classes.open : ""}`}>
            {elements.map((element) => {
              return (
                <Link
                  to={element.path}
                  className={`${classes.link}`}
                  key={element.label}
                  ////when you click a Link, the menu should close
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  {element.label}
                </Link>
              );
            })}
            <GoogleAuth />
          </menu>
        </React.Fragment>
      );
    }

    ////display for desktop
    return (
      <React.Fragment>
        {elements.map((element) => {
          return (
            <Link
              to={element.path}
              className={`${classes.link} mobile-invisible`}
              key={element.label}
            >
              {element.label}
            </Link>
          );
        })}
        <GoogleAuth />
      </React.Fragment>
    );
  };

  ////on desktop the nav contains all the links + the google auth button
  ////on tablet and mobile it contains only the hamburger icon
  const navWidth =
    windowWidth > 900 ? `${navElements.length * 6 + 7.5}rem` : "3rem";

  return (
    <nav
      className={`${classes.navbar}`}
      ////the width of the navbar increases dinamically as we add elements
      style={{ width: navWidth }}
    >
      {renderNavElementes(navElements)}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Navbar);

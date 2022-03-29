import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

import "../styles/Google.scss";

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
  let auth = useRef(null);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      ////initialising client returns Promise
      window.gapi.client
        .init({
          clientId:
            "117145731109-c909r2fqir1q80sqk2mus3kfpr08oouh.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          ////set initial state
          onAuthChange(auth.current.isSignedIn.get());
          ////listen will call the callback with a boolean value
          ////anytime we try to signIn or Out
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  });

  //arrow function, cause it is to be used as a callback
  //gapi calls it with a boolean argument
  const onAuthChange = (SignedIn) => {
    if (SignedIn) {
      signIn(
        auth.current.currentUser.get().getId(),
        auth.current.currentUser.get().getBasicProfile().getName()
      );
    } else {
      signOut();
    }
  };

  //2 callbacks to use as button handlers
  const onSignInClick = () => {
    auth.current.signIn();
  };
  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    }
    if (isSignedIn) {
      return (
        <div className="google-btn" onClick={onSignOutClick}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google"
            />
          </div>
          <p className="btn-text">Odjavi se</p>
        </div>
      );
    }
    return (
      <div className="google-btn" onClick={onSignInClick}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google"
          />
        </div>
        <p className="btn-text">Prijavi se</p>
      </div>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

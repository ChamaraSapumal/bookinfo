import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import UserAccount from "./UserAccount";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname} // Use pathname as key for transitions
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                onAuthSuccess={() => console.log("User authenticated")}
              />
            }
          />
          <Route path="/account" element={<UserAccount />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedRoutes;

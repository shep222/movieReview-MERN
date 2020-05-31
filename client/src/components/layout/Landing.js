import React from "react";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Movie Reviews</h1>
          <p className="lead">
            You can view the movies reviewed without an account, but if you
            would like to create a review you must create an account
          </p>
          <div className="buttons">
            <a href="/register" className="btn btn-primary">
              Sign Up
            </a>
            <a href="/login" className="btn btn-light">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

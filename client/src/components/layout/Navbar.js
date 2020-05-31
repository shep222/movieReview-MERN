import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/auth";

import Modal from "react-modal";
import Login from "../auth/Login";
import Register from "../auth/Register";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  Modal: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    backgroundColor: "red",
  },

  Overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "red",
  },
};

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(type) {
    type === "login" ? setIsRegister(false) : setIsRegister(true);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // may not need this
  }

  function closeModal() {
    setIsOpen(false);
  }

  const authLinks = (
    <ul>
      {/* <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li> */}
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
      {/* <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li> */}

      <li>
        <a
          onClick={() => {
            openModal("register");
          }}
          className=""
        >
          Sign Up
        </a>
      </li>
      <li>
        <a
          onClick={() => {
            openModal("login");
          }}
          className=""
        >
          Sign In
        </a>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-video"></i> Rate Movies
          </Link>
        </h1>

        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        // className="Modal"
        // overlayClassName="Overlay"
      >
        {isRegister ? <Register /> : <Login />}
      </Modal>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

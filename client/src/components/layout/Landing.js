import React, { useState } from "react";
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

const Landing = () => {
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
            <button
              onClick={() => {
                openModal("register");
              }}
              className="btn btn-primary"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                openModal("login");
              }}
              className="btn btn-light"
            >
              Login
            </button>
          </div>
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
        </div>
      </div>
    </section>
  );
};

export default Landing;

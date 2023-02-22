import React, { useState } from "react";
import ModalContent from "./ModalContent";

const Modal = ({ handleClose, showModal }) => {
  return (
    <>
      {showModal ? (
        <div
          style={{
            position: "absolute",
            zIndex: 99,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalContent handleClose={handleClose} />
        </div>
      ) : undefined}
    </>
  );
};

export default Modal;

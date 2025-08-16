import React, { useRef } from "react";
import LoginSignup from "./LoginSignup";

const LoginModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className=" rounded-xl shadow-lg w-full max-w-4xl mx-4">
        <LoginSignup onClose={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;

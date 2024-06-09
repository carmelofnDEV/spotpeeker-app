import React,{ useState } from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-40">
        <div className="absolute bg-black bg-opacity-30 inset-0"></div>
        <div className="relative lg:p-8 rounded-lg shadow-md w-full">
          <div className="absolute top-0 right-0 p-2">
            <button className="text-white bg-black p-1 rounded-lg" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }
};

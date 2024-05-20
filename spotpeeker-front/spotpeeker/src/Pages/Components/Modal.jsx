import { useState } from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center bg-black bg-opacity-50 z-40">
        <div className=" p-8 rounded-lg shadow-md mt-[5%]">
          <div className="flex justify-end">
            <button className="bg-white " onClick={onClose}>

              <svg
                width="20px"
                height="20px"
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">

                <g id="SVGRepo_bgCarrier" strokeWidth={0} />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M3 21.32L21 3.32001"
                    stroke="#000000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 3.32001L21 21.32"
                    stroke="#000000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>

          {children}
        </div>
      </div>
    );
  }
};

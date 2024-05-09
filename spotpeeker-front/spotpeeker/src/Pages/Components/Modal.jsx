import { useState } from "react";


export const Modal = ({ isOpen, onClose,children }) => {
  

    if (!isOpen){
        return null
    }else{
        return(
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-end">
                <button onClick={onClose}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>

                {children} 
            
            </div>
        </div>
        )
    };
}
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export const ToastNotifications = () => {

  const { toasts,setToast, toastViewed } = useContext(GlobalContext);

  useEffect(() => {
    
    toastViewed()

  }, [])
  

  const removeToast = (indexToRemove) => {
    setToast((prevToasts) =>
      prevToasts.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      {toasts.map((toast, index) => (
        <div key={index}>
          {toast.type === "success" && (
            <div className="flex items-center w-full max-w-xs p-4 mb-4 text-black !font-[800] bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="okIconTitle"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  color="#000000"
                >
                  <title id="okIconTitle">{"Ok"}</title>
                  <polyline points="4 13 9 18 20 7" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">{toast.message}</div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-black dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => removeToast(index)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}
          {toast.type === "info" && (
            <div className="flex items-center w-full max-w-xs p-4 mb-4 text-black !font-[800] bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="okIconTitle"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  color="#000000"
                >
                  <title id="okIconTitle">{"Ok"}</title>
                  <polyline points="4 13 9 18 20 7" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">{toast.message}</div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-black dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => removeToast(index)}
              >
                <span className="sr-only">Close</span>
                <svg
                  fill="#fff"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                </svg>
              </button>
            </div>
          )}
          {toast.type === "error" && (
            <div className="flex items-center w-full max-w-xs p-4 mb-4 text-black !font-[800] bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="okIconTitle"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  color="#000000"
                >
                  <title id="okIconTitle">{"Ok"}</title>
                  <polyline points="4 13 9 18 20 7" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">{toast.message}</div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-black dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => removeToast(index)}
              >
                <span className="sr-only">Close</span>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

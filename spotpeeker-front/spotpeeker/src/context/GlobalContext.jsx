import  { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [toasts, setToast] = useState([]); 
  const [startTimer, setStartTimer] = useState(true); 


  const toastViewed = () => {
    if (startTimer) {
      setStartTimer(false)
    
      setTimeout(() => {
        setToast([])
      setStartTimer(true)

      }, 3500);
    }
  }  
  return (
    <GlobalContext.Provider value={{ toasts, setToast, toastViewed }}>
      {children}
    </GlobalContext.Provider>
  );
};

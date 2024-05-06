import { useState } from "react";
import { env } from "../../env";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
  const navigate = useNavigate();

  const SERVER_URL = env.SERVER_URL;

  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});

  const [errors, setErrors] = useState({});

  const onChangeRegisterInput = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.id]: e.target.value,
    });
  };

  const onChangeLoginInput = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
  };

  const checkRegisterCredentials = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/register/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();



      return data;
      
    } catch (error) {
      console.error("Server Error:", error);

      return false;
    }


  };

  const checkLoginCredentials = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/login/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      console.log("respuesta servidoraa, ", data);

      return data;
    } catch (error) {
      console.error("Server Error:", error);

      return false;
    }
  };

  return {
    //Register
    onChangeRegisterInput,
    checkRegisterCredentials,
    registerData,
    setRegisterData,

    //Login
    onChangeLoginInput,
    checkLoginCredentials,
    loginData,
    setLoginData,

    //Auth
    setErrors,
    errors,
    navigate
    
  };
};

import { useState } from "react";
import { env } from "../../env";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export const useAuth = () => {
  const navigate = useNavigate();

  const SERVER_URL = env.SERVER_URL;

  const [registerData, setRegisterData] = useState({});
  const [loginData, setLoginData] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [errors, setErrors] = useState({});


  const handleOnChangePassword = async() => {

    try {
      const response = await fetch(`${SERVER_URL}/change-password/`, {
        method: "POST",

        credentials: "include",
      });
      const data = await response.json();

      console.log("respuesta servidoraa, ", data);

      if (data.status == "success") {

        return true;
        
      }else{
        return false;
      }

    } catch (error) {
      console.error("Server Error:", error);
      return false;
    }
    
  };

  const onLogout = async() => {

    try {
      const response = await fetch(`${SERVER_URL}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      console.log("respuesta servidoraa, ", data);

      if (data.status == true) {
        Cookies.remove('auth_token');
        return true;

      }else{
        return false;
      }

    } catch (error) {
      console.error("Server Error:", error);
      return false;
    }
    
  };

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

  useEffect(() => {
    checkSession();
  }, [navigate]);



  const checkSession = async () => {
    
    const authToken = {
      "auth_token":Cookies.get("auth_token"),
    };


    try {
        const response = await fetch(`${SERVER_URL}/verify-cookie/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authToken),
      });
      const data = await response.json();
      console.log("logged?",data)

      setIsLoggedIn( data.valid);
    } catch (error) {
      console.error("Server Error:", error);
      setIsLoggedIn(false);
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
    navigate,
    isLoggedIn, 
    setIsLoggedIn,
    checkSession,
    onLogout,
    handleOnChangePassword


    
  };
};

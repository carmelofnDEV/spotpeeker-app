import Cookies from "js-cookie";
import { useState } from "react";
import { env } from "../env";

export const useUserData = () => {
  const SERVER_URL = env.SERVER_URL;

  const getUser = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/getUser/${Cookies.get("auth_token")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("respuesta servidor, ", data);
      return data; 
    } catch (error) {
      console.error("Server Error:", error);
      return null; 
    }
  };

  return { getUser };
};
import { useState } from "react";
import { env } from "../env";

export const useFollow = ({ username = null, isFollow = false }) => {
  const [follow, setFollow] = useState(isFollow);

  const onFollow = async () => {
    const data = { profile: username };
    console.log(username);
    try {
      const response = await fetch(`${env.SERVER_URL}/follow/`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status === "success") {
        setFollow(result.action === "followed");
      }
    } catch (error) {
      console.error("Error following the user:", error);
    }
  };

  return { follow, setFollow, onFollow };
};

import { useEffect, useState } from "react";
import { env } from "../env";

export const useComments = (post_id) => {

  const [comments, setComments] = useState();

  const getComments = async () => {
    try {
      const response = await fetch(`${env.SERVER_URL}/get-comments/${post_id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      console.log("Comentarios ", data);
      setComments(data.comments);
    } catch (error) {
      console.error("Server Error:", error);
      return null;
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return {comments, setComments,getComments};
};

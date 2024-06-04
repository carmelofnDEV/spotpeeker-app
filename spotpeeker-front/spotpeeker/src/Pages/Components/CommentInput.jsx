import { useEffect } from "react";
import { env } from "../../env";



export const CommentInput = ({setPostComments,postComments,id}) => {

  const handleComment = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);
    if (formData.get("comentario").length > 0) {
      const data = {
        post: id,
        comentario: formData.get("comentario"),
      };
      e.target.reset();
      try {

        const response = await fetch(`${env.SERVER_URL}/comment-post/`, {
          method: "POST",
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.status == "success") {
          console.log(postComments)

          setPostComments([...postComments, result.comment]);
      

        }
      } catch (error) {
        console.error("Error comment the post:", error);
      }
    }



    
  };

      useEffect(() => {
      
      console.log(postComments)
    }, [postComments])

  return (
    <form
      onSubmit={handleComment}
      className="flex w-full p-3 bg-gray-100 rounded-t-md  "
    >
      <input
        type="text"
        name="comentario"
        id="comentario"
        className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        placeholder="Escribe un comentario..."
      />
      <button
        type="submit"
        className="p-2 ml-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-400"
      >
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
          className="feather feather-send"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

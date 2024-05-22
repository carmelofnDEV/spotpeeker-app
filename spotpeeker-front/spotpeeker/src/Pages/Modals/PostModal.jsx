import { useState } from "react";
import { env } from "../../env";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const PostModal = ({ onClose, onSuccess, singlePost }) => {
  const SERVER_URL = env.SERVER_URL;

  const [isLiking, setIsLiking] = useState(singlePost.liked_by_user);
  const [postComments, setPostComments] = useState(singlePost.comentarios);

  const handleLike = async () => {
    const data = {
      post: singlePost.id,
    };

    try {
      const response = await fetch(`${SERVER_URL}/like-post/`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status == "success") {
        if (result.action == "liked") {
          setIsLiking(true);
          singlePost.liked_by_user = true;
          singlePost.likes = singlePost.likes + 1;
        } else if (result.action == "unliked") {
          setIsLiking(false);
          singlePost.liked_by_user = false;
          singlePost.likes = singlePost.likes - 1;
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (formData.get("comentario").length > 0) {
      const data = {
        post: singlePost.id,
        comentario: formData.get("comentario"),
      };
      e.target.reset()
      try {
        const response = await fetch(`${SERVER_URL}/comment-post/`, {
          method: "POST",
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.status == "success") {
          console.log("publicado");
          setPostComments([...postComments, result.comment]);
        }
      } catch (error) {
        console.error("Error comment the post:", error);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center p-10 ">
        <div className="flex w-full justify-between items-center">
          <div className="bg-[#dddddd] p-3 rounded-t-lg">
            #{singlePost.autor}
          </div>

          <div className="flex justify-center items-center bg-[#76885b] px-5 py-1 rounded-xl">
            Seguir
          </div>
        </div>
        <div className="flex w-full">
          <Carousel
            className="flex bg-[#dddddd] items-center justify-center w-[600px] p-3"
            showThumbs={false}
            emulateTouch={true}
          >
            {singlePost.imagenes.map((photo, index) => (
              <div className="!flex !items-center !justify-center" key={index}>
                <img
                  className="max-w-[1600px] max-h-[1400px] object-contain"
                  src={`${SERVER_URL}/media/${photo.imagen}`}
                  alt={`Photo ${index}`}
                />
              </div>
            ))}
          </Carousel>

          {/* Caja de comentarios */}

          <div className="flex flex-col justify-between border-l-[1px] w-[500px] bg-[#76885b] overflow-hidden">
            <div className="h-[500px] overflow-y-auto scrollbar-hide">
              {/* Comentarios */}
              <ul className="list-none p-5 m-0">
                {postComments.map((comment, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-white p-4 rounded-lg shadow-md mb-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-full">
                      <img
                        className="object-cover w-full h-full"
                        src={`${SERVER_URL}/${comment.pic}`}
                        alt={`comment_pic_${index}`}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">
                        {comment.username}
                      </p>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleComment}
              className="flex w-full p-3 bg-gray-100 rounded"
            >
              <textarea
                name="comentario"
                id="comentario"
                className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Escribe un comentario..."
              ></textarea>
              <button className="p-2 ml-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-400">
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
          </div>
        </div>

        <div className="flex w-full justify-end items-end ">
          <div className="bg-[#dddddd] p-3 rounded-b-lg flex  gap-3">
            <button onClick={handleLike}>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={isLiking ? "#ffffff" : "#000000"}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998"
                    stroke={isLiking ? "#ffffff" : "#000000"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
                    stroke={isLiking ? "#ffffff" : "#000000"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke={isLiking ? "#ffffff" : "#000000"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
            <button>a</button>
          </div>
        </div>
      </div>
    </>
  );
};

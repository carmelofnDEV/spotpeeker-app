import { useState } from "react";
import { env } from "../../env";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const PostModal = ({ onClose, onSuccess, singlePost }) => {
  const SERVER_URL = env.SERVER_URL;

  const [isLiking, setIsLiking] = useState(singlePost.liked_by_user);



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
          singlePost.liked_by_user = true
          singlePost.likes=singlePost.likes+1

        } else if (result.action == "unliked") {
          setIsLiking(false);
          singlePost.liked_by_user = false
          singlePost.likes=singlePost.likes-1
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col w-[100%] items-center justify-center p-10 ">
        <div className="flex w-full justify-between items-center">
          <div className="bg-[#dddddd] p-3 rounded-t-lg">
            #{singlePost.autor}
          </div>

          <div className="flex justify-center items-center bg-[#76885b] px-5 py-1 rounded-xl">
            Seguir
          </div>
        </div>
        <Carousel
          className="flex bg-[#dddddd] items-center justify-center w-[600px] p-3"
          showThumbs={false}
          emulateTouch={true}
        >
          {singlePost.imagenes.map((photo, index) => (
            <div className="!flex !items-center !justify-center" key={index}>
              <img
                className="max-w-[600px] max-h-[400px] object-contain"
                src={`${SERVER_URL}/media/${photo.imagen}`}
                alt={`Photo ${index}`}
              />
            </div>
          ))}
        </Carousel>

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

import { useState } from "react";
import { env } from "../env";
import { Modal } from "./Components/Modal";
import { PostModal } from "./Modals/PostModal";

export const PostPerfil = ({ postPerfil }) => {
  const SERVER_URL = env.SERVER_URL;
  const [modalOpen, setmodalOpen] = useState(false);

  const openModal = () => {
    setmodalOpen(true);
  };

  const closeModal = () => {
    setmodalOpen(false);
  };

  return (
    <>
      <button
        className="group inline-block relative"
        key={Date.now() + Math.random()}
        onClick={openModal}
      >
        <img
          className="w-[300px] h-[300px] object-cover bg-[#ffffff]"
          key={postPerfil.imagenes[0].id}
          src={`${SERVER_URL}/media/${postPerfil.imagenes[0].imagen}`}
          alt="bad_post"
        />
        {/* Overlay de las fotos */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
          <p className="text-white text-lg">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffffff"
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
                  stroke="#ffffffff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
                  stroke="#ffffffff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                  stroke="#ffffffff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            {postPerfil.likes}
          </p>
        </div>
      </button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <PostModal singlePost={postPerfil} />
      </Modal>
    </>
  );
};

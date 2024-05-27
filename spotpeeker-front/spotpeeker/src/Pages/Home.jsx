import { env } from "../env";
import { PostModal } from "./Modals/PostModal";
import { useEffect, useState } from "react";
import { Modal } from "./Components/Modal";

export const Home = ({ logged }) => {
  const SERVER_URL = env.SERVER_URL;

  const [userFeed, setUserFeed] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getFeed = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/user_feed/`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (data.status == "success") {
        console.log(data);
        setUserFeed(data.publicaciones);
        setLoaded(true);
      }
    } catch (error) {
      console.error("Error al cargar feed:", error);
    }
  };

  const [openModalIndex, setOpenModalIndex] = useState(null);

  const openModal = (index) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loaded) {
    return (
      <div className="flex justify-center items-center mt-[2vh]">
        <div className="grid grid-cols-1 gap-4">
          {userFeed.map((post, index) => (
            <div
              key={index}
              className="flex flex-col justify-center bg-white bg-opacity-30 items-center"
            >
              <div className="w-full bg-white p-3">
                <div className="flex">
                  <p>#{post.autor}</p>
                </div>
              </div>
              <div className="flex justify-center items-center w-full h-[60vh]">
                <button
                  onClick={() => openModal(index)}
                  className="group inline-block relative w-full h-full"
                >
                  <img
                    src={`${SERVER_URL}/media/${post.imagenes[0].imagen}`}
                    alt="..."
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
              <div className="w-full bg-white p-3">
                <div className="flex justify-end">
                  <p>{post.likes} peeks</p>
                </div>
              </div>

              {openModalIndex === index && (
                <Modal isOpen={true} onClose={closeModal}>
                  <PostModal
                    singlePost={post}
                    isOwner={false}
                    handleOnFollow={true}
                    isFollowed={true}
                    logged={logged}
                  />
                </Modal>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

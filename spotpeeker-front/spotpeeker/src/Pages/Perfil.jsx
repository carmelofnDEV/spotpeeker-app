import { useEffect, useState } from "react";
import { useUserData } from "../Hooks/useUserData";
import { env } from "../env";
import { Modal } from "./Components/Modal";
import { PicProfileModal } from "./Modals/PicProfileModal";

export const Perfil = () => {
  const SERVER_URL = env.SERVER_URL;
  const [hoverImg, setHoverImg] = useState(false);

  const { getUser } = useUserData();
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);

  const [modalOpen, setmodalOpen] = useState(false);

  const fetchData = async () => {
    const data = await getUser();
    if (data != null) {
      if (data.status == "success") {
        setUserData(data.usuario);
        setProfileData(data.perfil);
        setPosts(data.publicaciones);
      }
    }
  };

  const openModal = () => {
    setmodalOpen(true);
  };

  const modalOnClose = () => {
    setmodalOpen(false);
  };

  const onSuccess = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <>
        <div className="min-w-full min-h-full justify-center items-center">
          <div className="grid grid-cols-4 p-10 ">
            <div></div>
            <div className="p-10 col-span-2 grid grid-cols-3 bg-[#dddddd] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,15)] relative">
              <div className="flex flex-col justify-center items-center p-4">
                <div
                  onMouseEnter={() => setHoverImg(true)}
                  onMouseLeave={() => setHoverImg(false)}
                  className="relative flex items-end"
                >
                  <img
                    className="border-[1px] bg-white rounded-full w-[200px] h-[200px] object-scale-down	"
                    src={`${SERVER_URL}${profileData.foto_perfil}`}
                    alt={`foto_perfil_${userData.username}`}
                  />
                  <div
                    className={`w-[20px] transition-opacity duration-500 ${
                      hoverImg ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      onClick={openModal}
                      className="rounded-xl transition-opacity duration-500 "
                    >
                      <svg
                        className="max-w-[200px] "
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
                          fill="#000"
                        ></path>{" "}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4 col-span-2 gap-3">
                <div className=" flex items-center justify-around gap-[20px]">
                  <h1 className="text-[30px]">#{userData.username}</h1>
                  <a className="text-[20px] rounded p-1 bg-[#76885b]" href="">
                    Editar perfil
                  </a>
                </div>
                <div className="flex justify-around">
                  <p>3 publicaciones</p>
                  <p>13 seguidores</p>
                  <p>1000 me gusta</p>
                </div>
                <div>{profileData.biografia}</div>
              </div>
            </div>
            <div></div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3">
              {posts.map((post) => (
                <>
                  <div
                    className=""
                    key={Date.now() + Math.random()}
                  >
                    <img
                      className="w-[200px] h-[200px] object-cover"
                      key={post.imagenes[0].id}
                      src={`${SERVER_URL}/media/${post.imagenes[0].imagen}`}
                      alt="bad_post"
                    />
                  </div>

                </>
              ))}
            </div>
          </div>

          <Modal isOpen={modalOpen} onClose={modalOnClose}>
            <PicProfileModal
              onClose={modalOnClose}
              onSuccess={onSuccess}
              some
            />
          </Modal>
        </div>
      </>
    </>
  );
};

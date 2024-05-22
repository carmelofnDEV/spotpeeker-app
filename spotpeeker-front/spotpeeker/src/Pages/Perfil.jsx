import { useEffect, useState, lazy, Suspense } from "react";
import { useUserProfile } from "../Hooks/useUserProfile";
import { env } from "../env";
import { Modal } from "./Components/Modal";
import { PicProfileModal } from "./Modals/PicProfileModal";
import { PostPerfil } from "./PostPerfil";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Hooks/useUser";

export const Perfil = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { username } = useParams();
  const SERVER_URL = env.SERVER_URL;

  const [hoverImg, setHoverImg] = useState(false);

  const { getUserProfile } = useUserProfile();

  const { getUser } = useUser();

  const [isFollowed, setIsFollowed] = useState(false);

  const [usernameProfile, setUsernameProfile] = useState();

  const [currentUser, setCurrentUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);

  const [modalOpen, setmodalOpen] = useState(false);

  const fetchData = async () => {
    const data = await getUserProfile(usernameProfile);

    if (data != null) {
      if (data.status == "success") {
        setUserData(data.usuario);
        setProfileData(data.perfil);
        setIsFollowed(data.perfil.followed);
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
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setCurrentUser(user.user.username);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setCurrentUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (pathname === "/perfil") {
      setUsernameProfile(currentUser);
      setIsOwner(true);
    } else {
      setUsernameProfile(username);
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    if (usernameProfile != undefined) {
      fetchData();
    }
  }, [usernameProfile, navigate, currentUser]);

  useEffect(() => {
    if (currentUser == usernameProfile) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }

    console.log("owner?", isOwner);
  }, [currentUser, isOwner]);

  const handleOnFollow = async () => {
    const data = {
      profile: userData.username,
    };

    try {
      const response = await fetch(`${SERVER_URL}/follow/`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status == "success") {
        if (result.action == "followed") {
          setIsFollowed(true);
        } else if (result.action == "unfollowed") {
          setIsFollowed(false);
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

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
                <div className=" flex items-center justify-between gap-3">
                  <h1 className="text-[30px]">#{userData.username}</h1>

                  {isOwner ? (
                    <a className="text-[20px] rounded p-1 bg-[#76885b]" href="">
                      Editar perfil
                    </a>
                  ) : (
                    <button
                      onClick={handleOnFollow}
                      className="text-[20px] rounded p-1 bg-[#76885b]"
                      href=""
                    >
                      {isFollowed ? <p>Siguiendo</p> : <p>Seguir</p>}
                    </button>
                  )}
                </div>
                <div className="flex justify-around">
                  {profileData.num_post == 1 ? (
                    <p>{profileData.num_post} publicación</p>
                  ) : (
                    <p>{profileData.num_post} publicaciones</p>
                  )}
                  <p>
                    {profileData.followers == 1
                      ? `${profileData.followers} seguidor`
                      : `${profileData.followers} seguidores`}
                  </p>
                  <p>
                    {profileData.likes_perfil == 1
                      ? `${profileData.likes_perfil} peek`
                      : `${profileData.likes_perfil} peeks`}
                  </p>
                </div>
                <div>{profileData.biografia}</div>
              </div>
            </div>
            <div></div>
          </div>

          <div className="flex justify-center relative">
            <div className="grid grid-cols-3 ">
              {/* Bucle de fotos */}
              {posts.map((post) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <PostPerfil
                    key={Date.now() + Math.random()}
                    postPerfil={post}
                  />
                </Suspense>
              ))}
            </div>
          </div>

          <Modal isOpen={modalOpen} onClose={modalOnClose}>
            <Suspense fallback={<div>Loading...</div>}>
              <PicProfileModal onClose={modalOnClose} onSuccess={onSuccess} />
            </Suspense>
          </Modal>
        </div>
      </>
    </>
  );
};

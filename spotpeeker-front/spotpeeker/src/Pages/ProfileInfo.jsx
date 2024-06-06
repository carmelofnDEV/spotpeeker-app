import { env } from "../env";
import { FollowersModal } from "./Modals/FollowersModal ";
import { EditProfileModal } from "./Modals/EditProfileModal";
import { Modal } from "./Components/Modal";
import { PicProfileModal } from "./Modals/PicProfileModal";
import { NotificationsModal } from "./Modals/NotificationsModal";
import { useEffect, useState, Suspense } from "react";

export const ProfileInfo = ({
  handleEditData,
  handleOnFollow,
  isOwner,
  profileInfo,
}) => {
  const [notifyCounter, setNotifyCounter] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [hoverImg, setHoverImg] = useState(false);
  const openModal = () => setModalOpen(true);
  const modalOnClose = () => setModalOpen(false);
  const notifyModal = () => setNotifyOpen(true);

  const [editOpen, setEditOpen] = useState(false);

  const [followersOpen, setFollowersOpen] = useState(false);
  const openPerfilModal = () => setEditOpen(true);
  const closePerfilModal = () => setEditOpen(false);
  const followersOnOpen = () => setFollowersOpen(true);
  const followersOnClose = () => setFollowersOpen(false);
  const notifyOnClose = () => setNotifyOpen(false);
  const onSuccess = () => {
    handleEditData();
    setEditOpen(false)
  };

  return (
    <>
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
                src={`${env.SERVER_URL}${profileInfo.profileData.foto_perfil}`}
                alt="foto_perfil"
              />

              {isOwner ? (
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
                      ></path>
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col p-4 col-span-2 gap-3">
            <div className=" flex items-center justify-between gap-3">
              <h1 className="text-[30px]">#{profileInfo.userData.username}</h1>

              {isOwner ? (
                <div className="flex gap-3 relative">
                  <button
                    onClick={openPerfilModal}
                    className="text-[20px] rounded p-1 bg-[#76885b]"
                  >
                    Ajustes perfil
                  </button>

                  <button
                    onClick={notifyModal}
                    className="text-[20px] rounded py-0.5 px-1 bg-opacity-50 bg-[#76885b]"
                  >
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5.5C14.7614 5.5 17 7.73858 17 10.5V12.7396C17 13.2294 17.1798 13.7022 17.5052 14.0683L18.7808 15.5035C19.6407 16.4708 18.954 18 17.6597 18H6.34025C5.04598 18 4.35927 16.4708 5.21913 15.5035L6.4948 14.0683C6.82022 13.7022 6.99998 13.2294 6.99998 12.7396L7 10.5C7 7.73858 9.23858 5.5 12 5.5ZM12 5.5V3M10.9999 21H12.9999"
                        stroke="#000000"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {notifyCounter !== 0 && (
                      <span className="text-black absolute top-0 right-0 bg-red-500  w-5 h-5 rounded-full flex items-center justify-center -mt-1 -mr-1">
                        {notifyCounter}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleOnFollow}
                  className="text-[20px] rounded p-1 bg-[#76885b]"
                  href=""
                >
                  {profileInfo.isFollowed ? <p>Siguiendo</p> : <p>Seguir</p>}
                </button>
              )}
            </div>
            <div className="flex justify-around">
              {profileInfo.profileData.num_post === 1 ? (
                <p>{profileInfo.profileData.num_post} publicación</p>
              ) : (
                <p>{profileInfo.profileData.num_post} publicaciones</p>
              )}
              <button onClick={followersOnOpen}>
                {profileInfo.profileData.followers === 1
                  ? `${profileInfo.profileData.followers} seguidor`
                  : `${profileInfo.profileData.followers} seguidores`}
              </button>
              <p>
                {profileInfo.profileData.likes_perfil === 1
                  ? `${profileInfo.profileData.likes_perfil} peek`
                  : `${profileInfo.profileData.likes_perfil} peeks`}
              </p>
            </div>
            <div>{profileInfo.profileData.biografia}</div>
          </div>
        </div>
        <div></div>
      </div>

      <Suspense fallback={<div></div>}>
        <FollowersModal
          user={profileInfo.userData.username}
          isOpen={followersOpen}
          onClose={followersOnClose}
        />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <NotificationsModal
          notifyCounter={notifyCounter}
          setNotifyCounter={setNotifyCounter}
          isOpen={notifyOpen}
          onClose={notifyOnClose}
          onSuccess={onSuccess}
        />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <EditProfileModal
          profileInfo={profileInfo}
          isOpen={editOpen}
          onClose={closePerfilModal}
          onSuccess={onSuccess}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Modal isOpen={modalOpen} onClose={modalOnClose}>
          <PicProfileModal onClose={modalOnClose} onSuccess={onSuccess} />
        </Modal>
      </Suspense>
    </>
  );
};

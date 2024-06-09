import { useEffect, useState, Suspense, useContext } from "react";
import { useUserProfile } from "../Hooks/useUserProfile";
import { env } from "../env";

import { PostPerfil } from "./PostPerfil";
import { useLocation, useParams } from "react-router-dom";
import { useUser } from "../Hooks/useUser";
import { ProfileInfo } from "./ProfileInfo";

import { ProfileLoader } from "../Loaders/ProfileLoader";
import { ToastNotifications } from "./Components/ToastNotifications";
import { ProfileNotFound } from "./ProfileNotFound";

export const Perfil = ({ logged = false }) => {
  const { pathname } = useLocation();
  const { username } = useParams();
  const SERVER_URL = env.SERVER_URL;

  const [usernameProfile, setUsernameProfile] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    profileData: {},
    userData: {},
    posts: [],
    isFollowed: false,
  });

  const [loading, setLoading] = useState(true);

  const { getUserProfile } = useUserProfile();
  const { getUser } = useUser();

  const handleEditData = () => {
    fetchUserData();
    fetchData();
  };

  const fetchData = async () => {
    if (!usernameProfile) return;

    try {
      const data = await getUserProfile(usernameProfile);
      if (data && data.status === "success") {
        setProfileInfo((prevState) => ({
          ...prevState,
          profileData: data.perfil,
          userData: data.usuario,
          isFollowed: data.perfil.followed,
          es_privado: data.perfil.es_privado,

          posts: data.publicaciones,
        }));
        setNotFound(false);

        setTimeout(() => {
          setLoading(false);
          

        }, 1000);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const user = await getUser();
      if (user && user.user && user.user.username) {
        setCurrentUser(user.user.username);
        if (pathname === "/perfil") {
          setUsernameProfile(user.user.username);
          setIsOwner(true);
        } else {
          setUsernameProfile(username);
        }
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      setCurrentUser(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (logged) {
      fetchUserData();
    } else {
      setUsernameProfile(username);
    }
  }, [pathname, username, logged]);

  useEffect(() => {
    setLoading(true);
    if (usernameProfile) {
      fetchData();
    }
  }, [usernameProfile]);

  useEffect(() => {
    setIsOwner(currentUser === usernameProfile);
  }, [currentUser, usernameProfile]);

  const handleOnFollow = async () => {
    const data = { profile: profileInfo.userData.username };

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
      if (result.status === "success") {
        setProfileInfo((prevState) => ({
          ...prevState,
          isFollowed: result.action === "followed",
        }));
      }
    } catch (error) {
      console.error("Error following the user:", error);
    }
  };

  if (notFound) {
    return <ProfileNotFound />;
  }

  return (
    <>
      <ProfileLoader onHide={loading} />

      <div
        className={
          " min-w-full min-h-full justify-center items-center" +
          (loading ? "  hidden" : "")
        }
      >
        <Suspense fallback={<div></div>}>
          <ProfileInfo
            handleEditData={handleEditData}
            handleOnFollow={handleOnFollow}
            isOwner={isOwner}
            profileInfo={profileInfo}

          />
        </Suspense>

        <div className="flex justify-center relative">
          <div className="grid grid-cols-3 ">
            {/* Bucle de fotos */}
            {profileInfo.posts.map((post, index) => (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                <PostPerfil
                  key={Date.now() + Math.random()}
                  postPerfil={post}
                  isOwner={isOwner}
                  handleOnFollow={handleOnFollow}
                  isFollowed={profileInfo.isFollowed}
                  logged={logged}
                />
              </Suspense>
            ))}
          </div>
        </div>

        <ToastNotifications />
      </div>
    </>
  );
};

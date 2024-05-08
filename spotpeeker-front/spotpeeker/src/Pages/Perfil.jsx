import { useEffect, useState } from "react";
import { useUserData } from "../Hooks/useUserData";
import { env } from "../env";
import { Navbar } from "./Navbar";


export const Perfil = () => {
  const SERVER_URL = env.SERVER_URL;

  const { getUser } = useUserData();
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      if (data != null) {
        if (data.status == "success") {
          setUserData(data.usuario);
          setProfileData(data.perfil);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-w-full min-h-full justify-center items-center">
        <div className="grid grid-cols-4 p-10 ">
          <div></div>
          <div className="p-10 col-span-2 grid grid-cols-3 bg-[#dddddd] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,15)]">
            <div className="flex flex-col justify-center items-center p-4">
              <img
                className="max-w-[200px]"
                src={`${SERVER_URL}${profileData.foto_perfil}`}
                alt={`foto_perfil_${userData.username}`}
              />
            </div>
            <div className="flex flex-col  p-4 col-span-2 gap-3">
              <div className=" flex items-center justify-around gap-[20px]">
                <h1 className="text-[30px]">#{userData.username}</h1>
                <a className="text-[20px] rounded p-1 bg-[#76885b]" href="">
                  Editar perfil
                </a>
              </div>
              <div className="flex justify-around"><p>3 publicaciones</p>  <p>13 seguidores</p>  <p>1000 me gusta</p></div>
              <div>{profileData.biografia}</div>

            </div>
          </div>
          <div></div>

        </div>
      </div>
    </>
  );
};

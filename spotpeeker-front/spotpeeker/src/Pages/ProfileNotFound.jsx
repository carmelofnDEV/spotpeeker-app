import { env } from "../env";


export const ProfileNotFound = () => {
  return (
    <div className="flex w-full justify-center ">
      <div className="grid grid-cols-4 p-10 ">
        <div></div>
        <div className="p-10 col-span-2 grid grid-cols-3 bg-[#dddddd] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,15)] relative">
          <div className="flex flex-col justify-center items-center p-4">
            <div

              className="relative flex items-end"
            >
              <img
                className="border-[1px] bg-white rounded-full w-[200px] h-[200px] object-scale-down	"
                src={`${env.SERVER_URL}/media/pics_profile/default.png`}
                alt="foto_perfil"
              />

       
            </div>
          </div>
          <div className="flex flex-col p-4 col-span-2 gap-3">
            <div className=" flex items-center justify-between gap-3">
              <h1 className="text-[30px]">Perfil no encontrado</h1>

            </div>
            <div className="flex justify-around">

            </div>
            <div>Parece que este perfil no existe...</div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

import { env } from "../env"
import { HomeLoader } from "./HomeLoader"



export const NotFeedHome = () => {
  
    return(
        <>
      <HomeLoader />

        <div className="relative w-full py-2 flex justify-center bg-white shadow-lg"> <img  className="max-h-[10vh]" src={`${env.SERVER_URL}/static/logo-home.png`} alt="logo-home" /></div>

        <div className="relative  flex  justify-center items-end w-full h-[82vh]">
            <div className="w-full flex flex-col justify-center text-center gap-5 bg-gray-300 bg-opacity-80 py-10 px-4">
                <p className="font-[700] text-[40px]">Parece que aún no sigues a nadie...</p>
                
                <p className="font-[700] text-[25px]">A que esperas para <a className="px-1 text-[#76885b] hover:underline" href="/descubrir">descubrir .</a></p>


            </div>
        </div>
        </>
    )
}
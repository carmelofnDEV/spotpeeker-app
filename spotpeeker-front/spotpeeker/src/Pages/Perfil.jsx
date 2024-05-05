import { env } from "../env";


export const Perfil = () => {
    
    const SERVER_URL = env.SERVER_URL;
    


  return (
    <div className="flex justify-center items-center">
        <h1>Perfil personal</h1>
      <a className="flex justify-center items-center" href="/"><img className="w-[60%]" src={`${SERVER_URL}/static/logo-home.png`} alt="imagen" /></a>
    </div>
  );
};

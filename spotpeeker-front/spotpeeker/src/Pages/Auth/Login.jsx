import { env } from "../../env";
import { useAuth } from "../../Hooks/Auth/useAuth";
import Cookies from 'js-cookie';

export const Login = () => {
  const SERVER_URL = env.SERVER_URL;

  
  const {
    checkLoginCredentials,
    onChangeLoginInput,
    errors,
    setErrors,
    navigate,
  } = useAuth();

  const loginCredentials = async (event) => {

    let data = await checkLoginCredentials(event);

    if (data.status == "error") {
      setErrors(data.errors);
      console.log("errorsss", errors);
    }else{
      console.log("cookie", data);
      Cookies.set('auth_token', data.response.cookie, { expires: 1, path: '/' });

      setErrors({});
      navigate("/")

    }
  }


  return (
    <div className="flex justify-center items-center mt-20 w-[100%] p-5 ">
      <form onSubmit={loginCredentials} className="lg:w-1/3 flex flex-col bg-[#dddddd] px-8 py-5 rounded-xl gap-5">
        <div className="flex justify-center ">

          <img
            className="w-[80%]"
            src={`${SERVER_URL}/static/logo-home.png`}
            alt="imagen"
          />
          
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Usuario o Correo:</label>
          <input onChange={onChangeLoginInput} type="text" id="email" required />
          {errors.unverified_email && (<span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">{errors.unverified_email}<svg className="animate-bounce" fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>)}
          {errors.not_email && (<span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">{errors.not_email}<svg className="animate-bounce" fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>)}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Contraseña:</label>
          <input onChange={onChangeLoginInput} type="password" id="password" required />
          {errors.bad_password && (<span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">{errors.bad_password}<svg className="animate-bounce" fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>)}

        </div>

        <div className="flex justify-center">
          <button className="bg-[#627254] p-2 rounded">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
};

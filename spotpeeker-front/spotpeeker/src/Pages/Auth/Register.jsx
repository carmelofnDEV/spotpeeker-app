import { useAuth } from "../../Hooks/Auth/useAuth";
import { env } from "../../env";

export const Register = () => {
  const SERVER_URL = env.SERVER_URL;

  const {
    checkRegisterCredentials,
    onChangeRegisterInput,
    errors,
    setErrors,
    navigate,
  } = useAuth();

  const registerCredentials = async (event) => {
    let data = await checkRegisterCredentials(event);


    if (data != false) {
      if (data.status == "error") {
        setErrors(data.errors);
        console.log("errorsss", errors);
      }else{
        navigate("/login/")
        setErrors({});
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-5  w-[100%] p-5 ">
      <form
        onSubmit={registerCredentials}
        className="lg:w-1/3 flex flex-col bg-[#dddddd] text-[20px] px-8 py-5 rounded-xl gap-8"
      >
        <div className="flex justify-center ">
          <img
            className="w-[80%]"
            src={`${SERVER_URL}/static/logo-home.png`}
            alt="imagen"
          />
        </div>
        <div className="flex justify-center">
          <h1 className="text-[25px]">!Registrate ahora!</h1>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Nombre:</label>
          <input onChange={onChangeRegisterInput} type="text" id="name" required />

          {errors.short_name && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">{errors.short_name}<svg className="animate-bounce" fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="last_name">Apellidos:</label>
          <input onChange={onChangeRegisterInput} type="text" id="last_name" required />

          {errors.short_lastname && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">{errors.short_lastname}<svg className="animate-bounce"  fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>)}
        </div>

        <div className="flex flex-col">
          <label htmlFor="username">Usuario:</label>
          <input onChange={onChangeRegisterInput} type="text" id="username" required />

          {errors.large_username && (<span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">{errors.large_username}<svg className="animate-bounce"  fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>)}
          {errors.username_exist && (<span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">{errors.username_exist}<svg className="animate-bounce"  fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>)}

        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Correo:</label>
          <input onChange={onChangeRegisterInput} type="email" id="email" required />

          {errors.email_exist && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">{errors.email_exist}<svg className="animate-bounce" fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Contraseña:</label>
          <input
            onChange={onChangeRegisterInput}
            type="password"
            id="password"
            required
          />

          {errors.short_password && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">{errors.short_password}<svg className="animate-bounce" fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>
          )}

          
        </div>

        <div className="flex flex-col">
          <label htmlFor="rep_password">Repetir contraseña:</label>
          <input
            onChange={onChangeRegisterInput}
            type="password"
            id="rep_password"
            required
          />

          {errors.different_password && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">{errors.different_password}<svg className="animate-bounce" fill="#ef4444" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg></span>
          )}
        </div>

        <div className="flex justify-center">
          <button className="bg-[#627254] p-2 rounded">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

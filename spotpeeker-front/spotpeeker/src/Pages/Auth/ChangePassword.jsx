import { useEffect } from "react";
import { useAuth } from "../../Hooks/Auth/useAuth";

export const ChangePassword = () => {
  const { handleOnChangePassword, onLogout } = useAuth();

  const onSendMail = async() => {
    const resp = await handleOnChangePassword();
    console.log(resp);
  }

  useEffect(() => {
    onSendMail()
    onLogout()
  }, []);

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-start ">
        <div className="flex  bg-white rounded mt-[30vh] py-4 px-10">
          <p className="text-[50px]">
            Hemos mandado un enlace a tu correo....
          </p>

          <p className="text-[50px]">
            Login
          </p>
        </div>
      </div>
    </>
  );
};

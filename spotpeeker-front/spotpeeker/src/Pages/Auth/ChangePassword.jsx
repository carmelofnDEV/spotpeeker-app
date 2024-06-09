import { useEffect } from "react";
import { useAuth } from "../../Hooks/Auth/useAuth";
import { env } from "../../env";

export const ChangePassword = () => {
  const { handleOnChangePassword, onLogout } = useAuth();

  const onSendMail = async () => {
    const resp = await handleOnChangePassword();
    console.log(resp);
  };

  useEffect(() => {
    onSendMail();
    onLogout();
  }, []);

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center mt-[30vh] rounded-t-lg">
        <div className="flex flex-col ">
          <div className="bg-gray-200 rounded-t-lg">
            <img
              className="py-4 px-8 max-h-[10vh]"
              src={`${env.SERVER_URL}/static/logo-home.png`}
              alt="logo-home"
            />
          </div>

          <div className="flex flex-col bg-white rounded  py-4 px-10">
            <p className="text-[30px] font-[500]">
              Hemos mandado un enlace a tu correo <br /> para restablecer tu
              contraseña.
            </p>
            <div className="flex w-full justify-end py-4 mt-5">
              <a
                className="flex items-center gap-2 py-2 px-6 rounded-lg border-[1px] bg-[#76885b] bg-opacity-100 hover:bg-opacity-80"
                href="/"
              >
                <span className="text-[18px] font-[700]">Ok</span>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="okIconTitle"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  color="#000000"
                >
                  <title id="okIconTitle">{"Ok"}</title>
                  <polyline points="4 13 9 18 20 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

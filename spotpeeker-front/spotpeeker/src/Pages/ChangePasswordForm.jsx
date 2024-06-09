import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { env } from "../env";
import { ProfileLoader } from "../Loaders/ProfileLoader";

export const ChangePasswordForm = () => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const { token } = useParams();

  const pass = useRef(null);
  const repeat = useRef(null);

  const navigate = useNavigate()

  const verifyToken = async () => {
    console.log(token);
    const dataT = {
      token: token,
    };
    try {
      const response = await fetch(`${env.SERVER_URL}/verify-email/`, {
        method: "POST",
        body: JSON.stringify(dataT),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
      }, 1200);

      if (data.status == "success") {
        setVerified(true);
      } else {
        setVerified(false);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
      console.error("Server Error:", error);
      setVerified(false);
    }
  };

  const handloChangePassword = async (e) => {
    e.preventDefault();
    console.log(token);

    const dataT = {
      pass: pass.current.value,
      repeat: repeat.current.value,
      token: token,
    };

    try {
      const response = await fetch(`${env.SERVER_URL}/change-user-password/`, {
        method: "POST",
        body: JSON.stringify(dataT),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
      }, 1200);

      if (data.status == "success") {
        navigate("/login")
      }else{
        setErrors(data.errors)
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
      console.error("Server Error:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

  return (
    <>
      <ProfileLoader onHide={loading} />

      {verified ? (
        <div className="w-full h-[100vh] flex justify-center mt-[30vh] rounded-t-lg">
          <div className="flex flex-col ">
            <div className="bg-gray-200 rounded-t-lg py-2 px-10 ">
              <p className="text-[30px] font-[500] mr-20">
                Restablecer contraseña
              </p>
            </div>

            <div className="flex flex-col bg-white rounded  py-4 px-10">
              <form
                onSubmit={(e) => {
                  handloChangePassword(e);
                }}
              >
                <div className="flex flex-col">
                  <label htmlFor="password">Contraseña:</label>
                  <input type="password" ref={pass} id="password" required />

                  {errors.short_password && (
                    <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                      {errors.short_password}
                      <svg
                        className="animate-bounce"
                        fill="#ef4444"
                        width="18px"
                        height="18px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path>{" "}
                        </g>
                      </svg>
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="rep_password">Repetir contraseña:</label>
                  <input
                    type="password"
                    id="rep_password"
                    ref={repeat}
                    required
                  />

                  {errors.different_password && (
                    <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px]">
                      {errors.different_password}
                      <svg
                        className="animate-bounce"
                        fill="#ef4444"
                        width="18px"
                        height="18px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>warning</title>{" "}
                          <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path>{" "}
                        </g>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="flex w-full justify-end py-4 mt-5">
                <button
                  className="flex items-center gap-2 py-2 px-6 rounded-lg border-[1px] bg-[#76885b] bg-opacity-100 hover:bg-opacity-80"
                 
                >
                  <span>Cambiar contraseña</span>
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
                </button>
              </div>
              </form>


            </div>
          </div>
        </div>
      ) : (
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
              <p className="text-[30px] font-[500]">Este token no es valido.</p>
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
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { env } from "../env";
import { ProfileLoader } from "../Loaders/ProfileLoader";

export const VerifyMail = () => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const { token } = useParams();

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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Server Error:", error);
      return false;
    }
  };

  useEffect(() => {
    if (verifyToken()) {
      setVerified(true);
    }
  }, [token]);

  return (
    <>
      <ProfileLoader onHide={loading} />

      {verified ? (
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
                !Correo verficado correctamente!
              </p>
              <div className="flex w-full justify-end py-4 mt-5">
                <a
                  className="flex items-center gap-2 py-2 px-6 rounded-lg border-[1px] bg-[#76885b] bg-opacity-100 hover:bg-opacity-80"
                  href="/"
                >
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
              <p className="text-[30px] font-[500]">
                Este token de verificacion no es valido.
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
      )}
    </>
  );
};

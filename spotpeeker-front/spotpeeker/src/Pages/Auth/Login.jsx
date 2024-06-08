import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { env } from "../../env";
import { useAuth } from "../../Hooks/Auth/useAuth";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ToastNotifications } from '../Components/ToastNotifications';

export const Login = () => {
  const navigate = useNavigate();
  const SERVER_URL = env.SERVER_URL;
  const {
    checkLoginCredentials,
    onChangeLoginInput,
    errors,
    setErrors,
  } = useAuth();

  const recaptchaRef = useRef();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    recaptchaRef.current.execute();
  };

  const handleCaptchaChange = (token) => {
    setIsCaptchaVerified(true);
    loginCredentials();
  };

  const loginCredentials = async () => {
    let data = await checkLoginCredentials(event);
    if (data.status === "error") {
      setErrors(data.errors);
    } else {
      Cookies.set('auth_token', data.response.cookie, { expires: 1, path: '/' });
      navigate("/");
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center mt-20 w-[100%] p-5 ">
      <form onSubmit={handleLogin} className="lg:w-1/3 flex flex-col bg-[#dddddd] px-8 py-5 rounded-xl gap-5">
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
          {errors.unverified_email && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">
              {errors.unverified_email}
            </span>
          )}
          {errors.not_email && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">
              {errors.not_email}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Contraseña:</label>
          <input onChange={onChangeLoginInput} type="password" id="password" required />
          {errors.bad_password && (
            <span className="flex gap-1 items-center mt-3 !text-[#ef4444] text-[18px] ">
              {errors.bad_password}
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <button className="bg-[#627254] p-2 rounded">Iniciar sesión</button>
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfZQvQpAAAAAHTb_2JimitBDn8rsoc1FBEwT129"
          onChange={handleCaptchaChange}
          size="invisible"
        />
      </form>
      <ToastNotifications />
    </div>
  );
};

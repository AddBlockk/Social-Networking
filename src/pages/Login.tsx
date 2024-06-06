import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const { theme } = useContext<ThemeContext>(ThemeContext);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setShowLoadingMessage(true);
    setShowErrorMessage(false);
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
      setShowLoadingMessage(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <div
      className={`${
        theme.themeType === "light" ? "light" : "dark"
      } h-screen flex justify-center items-center`}>
      <div
        className={`${
          theme.themeType === "light" ? "dark" : "light"
        } px-[120px] py-[80px] rounded-md`}>
        <form
          className="flex flex-col items-center my-[10px]"
          onSubmit={handleSubmit}>
          <h1 className="text-[32px] font-bold">Social Chat</h1>
          <p className="text-[14px]">Логин</p>
          <div className="flex flex-col gap-8 mt-8 text-black min-w-[300px] max-w-[300px]">
            <input
              type="email"
              className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pr-[20px] pl-[20px] w-full focus:outline-none focus:ring-[2px] ${
                theme.themeType === "light"
                  ? "input-searchLight"
                  : "input-searchDark"
              }`}
              placeholder="Email"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <input
              type="password"
              className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pr-[20px] pl-[20px] w-full focus:outline-none focus:ring-[2px] ${
                theme.themeType === "light"
                  ? "input-searchLight"
                  : "input-searchDark"
              }`}
              placeholder="Пароль"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          <Button
            type="submit"
            style={{
              borderRadius: 20,
              backgroundColor: "#8774e1",
              margin: "32px 0",
              fontSize: "16px",
              textTransform: "capitalize",
              width: "100%",
            }}
            variant="contained">
            Войти
          </Button>
          <div className="flex justify-center">
            {showLoadingMessage && (
              <span className="text-yellow-600">
                Подождите пока загрузятся данные
              </span>
            )}
            {showErrorMessage && (
              <span className="text-red-600">Что-то пошло не так</span>
            )}
          </div>
          <p className="my-[10px] flex justify-center gap-5">
            Ещё нет аккаунта?
            <Link
              to="/register"
              className="text-[#ffeb99] hover:text-[#ffeb999e]">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;

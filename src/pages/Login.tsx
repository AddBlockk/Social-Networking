import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, ListItemIcon, MenuItem, Box, Switch } from "@mui/material";
import ContrastIcon from "@mui/icons-material/Contrast";

interface LoginProps {
  isNightMode: boolean;
}

function Login({ isNightMode }: LoginProps) {
  const { theme, toggleTheme } = useContext<ThemeContext>(ThemeContext);
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

  const handleSwitchClick = (event: React.MouseEvent<HTMLLIElement>) => {
    toggleTheme();
    event.stopPropagation();
  };

  return (
    <div
      className={`${
        theme.themeType === "light" ? "light" : "dark"
      } h-screen flex justify-center items-center register-background`}>
      <div
        className={`${
          theme.themeType === "light" ? "dark" : "light"
        } w-full max-w-[600px] py-[80px] rounded-md mx-[30px]`}>
        <form
          className="flex flex-col items-center my-[10px]"
          onSubmit={handleSubmit}>
          <h1 className="text-[32px] font-bold">Social Chat</h1>
          <p className="text-[14px]">Логин</p>
          <div className="flex flex-col gap-8 mt-8 text-black w-full max-w-[360px] px-[10px]">
            <input
              type="email"
              className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pr-[20px] pl-[20px] max-w-[360px]" focus:outline-none focus:ring-[2px] ${
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
              className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pr-[20px] pl-[20px] max-w-[360px] focus:outline-none focus:ring-[2px] ${
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
              maxWidth: "100%",
              width: "300px",
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
              className="text-[#8774E1] hover:text-[#766ac8] font-semibold">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
      <div className="absolute right-5 bottom-5 bg-[#8774E1] text-[white] rounded-lg">
        <MenuItem onClick={handleSwitchClick}>
          <ListItemIcon>
            <ContrastIcon
              fontSize="small"
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          Night Mode
          <Box sx={{ flexGrow: 1 }} />
          <Switch checked={isNightMode} />
        </MenuItem>
      </div>
    </div>
  );
}
export default Login;

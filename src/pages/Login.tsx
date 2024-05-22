import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/material";

function Login() {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const { theme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div
      className={`${
        theme.themeType === "light" ? "light" : "dark"
      } h-screen flex justify-center items-center`}>
      <div
        className={`${
          theme.themeType === "light" ? "dark" : "light"
        } px-[120px] py-[80px] rounded-md`}>
        <div className="flex flex-col items-center my-[10px]">
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
          <p>Ещё нет аккаунта?</p>
        </div>
      </div>
    </div>
  );
}
export default Login;

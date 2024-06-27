import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button, ListItemIcon, MenuItem, Box, Switch } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import ContrastIcon from "@mui/icons-material/Contrast";

interface RegisterProps {
  isNightMode: boolean;
}

function Register({ isNightMode }: RegisterProps) {
  const [err, setErr] = useState(false);

  const { theme, toggleTheme } = useContext<ThemeContext>(ThemeContext);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showExpectationMessage, setShowExpectationMessage] = useState(true);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errFile, setErrFile] = useState<string>("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    setSelectedFile(file);
    setShowExpectationMessage(false);
    setPhotoUploaded(true);
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setShowExpectationMessage(true);
    setPhotoUploaded(false);
  };

  const handleSwitchClick = (event: React.MouseEvent<HTMLLIElement>) => {
    toggleTheme();
    event.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setShowExpectationMessage(true);
    setShowLoadingMessage(true);
    setShowErrorMessage(false);
    e.preventDefault();
    const displayName = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;

    try {
      if (!selectedFile) {
        setErrFile("Добавьте аватарку");
        setShowLoadingMessage(false);
        return;
      }

      if (!displayName) {
        setErrFile("Пожалуйста, введите имя");
        return;
      }

      if (!email || !email.includes("@")) {
        setErrFile("Пожалуйста, введите корректный email");
        return;
      }

      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setErrFile("Пользователь с таким email уже существует");
        return;
      }

      if (password.length < 6) {
        setErrFile("Пароль должен содержать не менее 6 символов");
        return;
      }

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Обрабатываем ошибку
          setErr(true);
          setShowLoadingMessage(false);
          setShowErrorMessage(true);
        },
        async () => {
          // Загрузка завершена, получаем ссылку на файл
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          try {
            // Обновляем профиль
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Создаем пользователя
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            // Создаем пустые пользовательские чаты в firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setShowLoadingMessage(false);
            setShowExpectationMessage(false);
            setPhotoUploaded(true);
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setShowLoadingMessage(false);
            setShowErrorMessage(true);
          }
        }
      );
    } catch (err) {
      setErr(true);
      setShowLoadingMessage(false);
    }
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
        <div className="flex flex-col items-center my-[10px]">
          <h1 className="text-[32px] font-bold">Social Chat</h1>
          <p className="text-[14px]">Register</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 mt-8 w-full max-w-[360px] px-[10px]">
            <input
              type="text"
              name="0"
              className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pr-[20px] pl-[20px] max-w-[360px] focus:outline-none focus:ring-[2px] ${
                theme.themeType === "light"
                  ? "input-searchLight"
                  : "input-searchDark"
              }`}
              placeholder="Имя"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <input
              type="email"
              className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pr-[20px] pl-[20px] max-w-[360px] focus:outline-none focus:ring-[2px] ${
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

            <div className="my-[20px]">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className={`my-[10px] flex gap-5 items-center cursor-pointer ${
                  theme.themeType === "light" ? "text-white" : "text-black"
                } justify-center`}>
                <AddAPhotoIcon />
                {showExpectationMessage && !photoUploaded && (
                  <span>Добавьте фотографию</span>
                )}
                {photoUploaded && <span>Фотография загружена</span>}
              </label>
              {photoUploaded && (
                <Button
                  onClick={handleRemovePhoto}
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#8774e1",
                    marginBottom: "10px",
                    marginTop: "20px",
                    fontSize: "16px",
                    textTransform: "capitalize",
                    width: "100%",
                  }}
                  variant="contained">
                  Удалить фотографию
                </Button>
              )}
            </div>
            <Button
              type="submit"
              style={{
                borderRadius: 20,
                backgroundColor: "#8774e1",
                marginBottom: "10px",
                fontSize: "16px",
                textTransform: "capitalize",
                width: "100%",
              }}
              variant="contained">
              Зарегистрироваться
            </Button>
            <div className="flex justify-center">
              {/* {showLoadingMessage && (
                <span className="text-yellow-600">
                  Подождите пока загрузятся данные
                </span>
              )} */}
              {/* {showErrorMessage && (
                <span className="text-red-600">Что-то пошло не так</span>
              )} */}
              {errFile && <p className="text-red-600 text-center">{errFile}</p>}
            </div>
          </form>
        </div>
        <p className="my-[10px] flex justify-center gap-5">
          Уже есть аккаунт?
          <Link
            to="/login"
            className="text-[#8774E1] hover:text-[#766ac8] font-semibold">
            Логин
          </Link>
        </p>
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

export default Register;

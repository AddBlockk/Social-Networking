import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [err, setErr] = useState(false);
  const { theme } = useContext<ThemeContext>(ThemeContext);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showExpectationMessage, setShowExpectationMessage] = useState(true);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setShowExpectationMessage(true);
    setShowLoadingMessage(true);
    setShowErrorMessage(false);
    e.preventDefault();
    const displayName = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (selectedFile) {
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // Обрабатываем ошибку
            console.log(error);
            setErr(true);
            setShowLoadingMessage(false);
            setShowErrorMessage(true);
          },
          () => {
            // Загрузка завершена, получаем ссылку на файл
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
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
          }
        );
      } else {
        // Обработка ошибки, если файл не выбран
        setErr(true);
        setShowLoadingMessage(false);
        setShowErrorMessage(true);
      }
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
        <div className="flex flex-col items-center my-[10px]">
          <h1 className="text-[32px] font-bold">Social Chat</h1>
          <p className="text-[14px]">Register</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 mt-8 min-w-[300px] max-w-[300px]">
            <input
              type="text"
              name="0"
              className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pr-[20px] pl-[20px] w-full focus:outline-none focus:ring-[2px] ${
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

            <div className="my-[20px]">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className="my-[10px] flex gap-3 items-center cursor-pointer text-white">
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
              {showLoadingMessage && (
                <span className="text-yellow-600">
                  Подождите пока загрузятся данные
                </span>
              )}
              {showErrorMessage && <span>Что-то пошло не так</span>}
            </div>
          </form>
        </div>
        <p className="my-[10px]">
          Уже есть аккаунт? <Link to="/register">Логин</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

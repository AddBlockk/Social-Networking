/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Avatar } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import AllChats from "./AllChats";
import PersonalChats from "./PersonalChats";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";
import MenuButton from "./MenuButton";
import MenuItems from "./MenuItems";
import SearchBar from "./SearchBar";

export interface User {
  displayName: string;
  photoURL: string;
  uid: string;
}

function SideBar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isNightMode, setIsNightMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    setIsNightMode(theme.themeType === "dark");
  }, [theme]);

  const handleSwitchClick = () => {
    toggleTheme();
    setIsNightMode(!isNightMode);
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true);
      } else {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUser({
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            uid: userData.uid,
          });
        });
        setErr(false);
      }
    } catch (error) {
      console.log("gdfg");
      setErr(true);
    }
  };

  const handleKey = (e: { code: string }) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const [_isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { currentUser } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser!.uid > user!.uid
        ? currentUser!.uid + user!.uid
        : user!.uid + currentUser!.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //создание чата в коллекции чатов
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //создание пользовательских чатов
        await updateDoc(doc(db, "userChats", currentUser!.uid), {
          [combinedId + ".userInfo"]: {
            uid: user!.uid,
            displayName: user!.displayName,
            photoURL: user!.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user!.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser!.uid,
            displayName: currentUser!.displayName,
            photoURL: currentUser!.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div
      className={`px-[10px] h-screen ${
        theme.themeType === "light" ? "light" : "dark"
      }`}>
      <div className="py-[6px] flex gap-3">
        {/* Кнопка меню */}
        <MenuButton anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        {/* Внутренности меню */}
        <MenuItems
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          isNightMode={isNightMode}
          toggleTheme={toggleTheme}
        />
        {/* Поле поиска */}
        <SearchBar
          username={username}
          setUsername={setUsername}
          handleKey={handleKey}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          theme={theme}
          setUser={setUser}
        />
      </div>
      <div className="flex justify-center">
        {err && <span>Пользователь не найден</span>}
      </div>

      {user && (
        <div
          onClick={handleSelect}
          className={`flex items-center gap-5 relative ml-[5px] mt-[20px] cursor-pointer px-[5px] my-[5px] rounded-lg ${
            theme.themeType === "light"
              ? "hover:bg-[#f4f4f5]"
              : "hover:bg-[#2c2c2c]"
          }`}>
          <div className="flex items-center">
            <Avatar alt="" src={user.photoURL} />
          </div>
          <div className="w-full flex flex-col items-start">
            <p
              className={`text-white truncate text-ellipsis  ${
                theme.themeType === "light" ? "textLight" : "textDark"
              }`}>
              {user.displayName}
            </p>
          </div>
        </div>
      )}

      {/* Список */}
      <div className="text-[#aaaaaa] flex gap-5 px-[13px] mt-[30px] justify-center">
        <div
          className={`${
            selectedTab === "all"
              ? theme.themeType === "dark"
                ? "text-[#8774e1]"
                : "text-[#3390ec]"
              : "text-[#aaaaaa]"
          } px-[1.625rem] py-[.325rem] select-none rounded font-semibold cursor-pointer ${
            theme.themeType === "light"
              ? "hover:bg-[#f4f4f4]"
              : "hover:bg-[#2b2b2b]"
          }`}
          onClick={() => handleTabClick("all")}>
          <span>All</span>
        </div>
        <div
          className={`${
            selectedTab === "personal"
              ? theme.themeType === "dark"
                ? "text-[#8774e1]"
                : "text-[#3390ec]"
              : "text-[#aaaaaa]"
          } px-[1.625rem] py-[.325rem] select-none rounded font-semibold cursor-pointer ${
            theme.themeType === "light"
              ? "hover:bg-[#f4f4f4]"
              : "hover:bg-[#2b2b2b]"
          }
          `}
          onClick={() => handleTabClick("personal")}>
          <span>Personal</span>
        </div>
        <div
          className={`${
            selectedTab === "unread"
              ? theme.themeType === "dark"
                ? "text-[#8774e1]"
                : "text-[#3390ec]"
              : "text-[#aaaaaa]"
          } px-[1.625rem] py-[.325rem] select-none rounded font-semibold cursor-pointer ${
            theme.themeType === "light"
              ? "hover:bg-[#f4f4f4]"
              : "hover:bg-[#2b2b2b]"
          }`}
          onClick={() => handleTabClick("unread")}>
          <span>Unread</span>
        </div>
      </div>

      {/* Компоненты */}
      <div
        className={`mt-[20px] pl-[5px] h-[calc(100vh-170px)] overflow-y-auto overflow-x-hidden ${
          theme.themeType === "light"
            ? "custom-scrollbarLight"
            : "custom-scrollbarDark"
        }`}>
        {selectedTab === "all" && <AllChats />}
        {selectedTab === "personal" && <PersonalChats />}
        {selectedTab === "unread" && (
          <div
            className={`text-white flex justify-center mt-10 ${
              theme.themeType === "light" ? "text-[#aaa]" : "text-white"
            }`}>
            Непрочитанные чаты
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;

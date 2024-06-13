import React, { useState, useContext } from "react";
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
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import AllChats from "./AllChats";
import PersonalChats from "./PersonalChats";
import ContrastIcon from "@mui/icons-material/Contrast";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";

function SideBar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState(false);

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
  const [isInputFocused, setIsInputFocused] = useState(false);

  interface User {
    displayName: string;
    photoURL: string;
    uid: string;
  }

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const { theme, toggleTheme } = useContext<ThemeContext>(ThemeContext);
  const [isNightMode, setIsNightMode] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { currentUser } = useContext(AuthContext);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOut = () => {
    signOut(auth);
  };

  const [selectedTab, setSelectedTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSwitchClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setIsNightMode(!isNightMode);
    toggleTheme();
    event.stopPropagation();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser!.uid > user!.uid
        ? currentUser!.uid + user!.uid
        : user!.uid + currentUser!.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
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
        <Tooltip title="Open Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <MenuIcon sx={{ color: "#aaaaaa", width: 24, height: 24 }} />
          </IconButton>
        </Tooltip>
        {/* Внутренности меню */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{
            "& .MuiMenu-paper": {
              backgroundColor:
                theme.themeType === "light" ? "white" : "#303030",
              color: theme.themeType === "light" ? "black" : "white",
            },
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 10,
                width: 10,
                height: 10,
                backgroundColor: "windowMenuMarkLight",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <MenuItem onClick={handleSwitchClick}>
            <ListItemIcon>
              <ContrastIcon
                fontSize="small"
                sx={{
                  color: theme.themeType === "light" ? "#707579" : "white",
                }}
              />
            </ListItemIcon>
            Night Mode
            <Box sx={{ flexGrow: 1 }} />
            <Switch checked={isNightMode} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings
                fontSize="small"
                sx={{
                  color: theme.themeType === "light" ? "#707579" : "white",
                }}
              />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleOut}>
            <ListItemIcon>
              <Logout
                fontSize="small"
                sx={{
                  color: theme.themeType === "light" ? "#707579" : "white",
                }}
              />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Поле поиска */}

        <div className="searchInput relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon
              className={`searchIcon ${
                isInputFocused ? "searchIconFocused" : ""
              } ${
                theme.themeType === "light"
                  ? "searchIconLight"
                  : "searchIconDark"
              }`}
            />
          </div>
          <input
            type="text"
            className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pl-[43px] w-full focus:outline-none focus:ring-[2px] ${
              theme.themeType === "light"
                ? "input-searchLight"
                : "input-searchDark"
            }`}
            placeholder="Search"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={username}
          />
        </div>
      </div>
      {err && <span>Пользователь не найден</span>}

      {user && (
        <div
          onClick={handleSelect}
          className={`flex items-center gap-5 relative ml-[5px] mt-[20px] cursor-pointer px-[5px] py-[5px] rounded-lg ${
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
      <div className="text-[#aaaaaa] flex gap-5 px-[13px] mt-[30px]">
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
        className={`mt-[20px] pl-[5px] pr-[15px] h-[calc(100vh-138px)] overflow-y-auto overflow-x-hidden ${
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../ThemeStyles.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../components/SideBar";

export interface SearchBarProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleKey: (e: { code: string }) => void;
  onFocus: () => void;
  onBlur: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  theme: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  username,
  setUsername,
  handleKey,
  setUser,
  theme,
}) => {
  const [_err, setErr] = useState(false);

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
          setUsername(userData.displayName);
        });
        setErr(false);
      }
    } catch (error) {
      setErr(true);
    }
  };

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="searchInput relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon
          className={`searchIcon ${isInputFocused ? "searchIconFocused" : ""} ${
            theme.themeType === "light" ? "searchIconLight" : "searchIconDark"
          }`}
        />
      </div>
      <input
        type="text"
        className={`rounded-full h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pl-[43px] w-full focus:outline-none focus:ring-[2px] ${
          theme.themeType === "light" ? "input-searchLight" : "input-searchDark"
        }`}
        placeholder="Search"
        onKeyDown={handleKey}
        onChange={(e) => {
          setUsername(e.target.value);
          setUser(null);
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={username}
      />
      <button
        className={`absolute right-0 top-[50%] translate-y-[-50%] mr-3 ${
          theme.themeType === "light"
            ? "text-gray-700 hover:text-gray-900"
            : "text-gray-300 hover:text-white"
        }`}
        onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};

export default SearchBar;

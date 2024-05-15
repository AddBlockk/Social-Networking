import React, { useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AllChats from "./AllChats";
import PersonalChats from "./PersonalChats";

function SideBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedTab, setSelectedTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="bg-[#212121] px-[10px] h-screen">
      <div className="py-[6px] flex gap-3">
        {/* Кнопка меню */}
        <Tooltip title="Open Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <MenuIcon sx={{ color: "white", width: 24, height: 24 }} />
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
              backgroundColor: "#303030",
              color: "white",
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
                backgroundColor: "#303030",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        {/* Поле поиска */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="text-[#6b6b6b]" />
          </div>
          <input
            type="search"
            className="bg-[#2c2c2c] rounded-full placeholder-[#a2acb4] h-[2.5rem] mb-[0] pt-[6px] pb-[7px] pl-[43px] w-full text-white focus:outline-none focus:ring-1 ring-[#8774e1]"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Список */}
      <div className="text-[#aaaaaa] flex gap-5 px-[13px] mt-[30px]">
        <div
          className={`${
            selectedTab === "all" ? "text-[#8774e1]" : "text-[#aaaaaa]"
          } hover:bg-[#2b2b2b] px-[1.625rem] py-[.325rem] rounded font-semibold cursor-pointer`}
          onClick={() => handleTabClick("all")}>
          <span>All</span>
        </div>
        <div
          className={`${
            selectedTab === "personal" ? "text-[#8774e1]" : "text-[#aaaaaa]"
          } hover:bg-[#2b2b2b] px-[1.625rem] py-[.325rem] rounded font-semibold cursor-pointer`}
          onClick={() => handleTabClick("personal")}>
          <span>Personal</span>
        </div>
        <div
          className={`${
            selectedTab === "unread" ? "text-[#8774e1]" : "text-[#aaaaaa]"
          } hover:bg-[#2b2b2b] px-[1.625rem] py-[.325rem] rounded font-semibold cursor-pointer`}
          onClick={() => handleTabClick("unread")}>
          <span>Unread</span>
        </div>
      </div>

      {/* Компоненты */}
      <div className="mt-[20px] ml-[5px]">
        {selectedTab === "all" && <AllChats />}
        {selectedTab === "personal" && <PersonalChats />}
        {selectedTab === "unread" && (
          <div className="text-white flex justify-center mt-10">
            Непрочитанные чаты
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
